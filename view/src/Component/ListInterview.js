import React, { useEffect, useState } from "react";
import "../css/list.css";
import axios from "axios";

const ListInterview = () => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await axios.get("/api/interviews/allInterview");
        setInterviews(res.data);
        console.log("Interview data set");
      } catch (error) {
        console.log("Error while calling get all interviews", error);
      }
    };
    fetchInterviews();
  }, []);

  const handleDelete = async (interviewId) => {
    try {
      await axios.delete(`/api/interviews/delete/${interviewId}`);
      setInterviews(
        interviews.filter((interview) => interview._id !== interviewId)
      );
      console.log("Interview deleted successfully");
    } catch (error) {
      console.log("Error while deleting interview", error);
    }
  };

  return (
    <div className="interviews-list-container">
      {interviews.length > 0 ? (
        interviews.map((interview) => (
          <div className="interview-box" key={interview._id}>
            <h3>{interview.companyName}</h3>
            <p>Date: {new Date(interview.date).toLocaleDateString()}</p>
            <p>Batch: {interview.batchId.batchName}</p>
            <div className="students-list">
              <h4>Allocated Students:</h4>
              <ul>
                {interview.allocatedStudents.map((studentId) => (
                  <li key={studentId}>{studentId}</li> // Assuming studentId is a string; adjust if it's an object
                ))}
              </ul>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(interview._id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No interviews available.</p>
      )}
    </div>
  );
};

export default ListInterview;
