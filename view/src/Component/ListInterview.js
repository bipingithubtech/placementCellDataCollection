import React, { useEffect, useState } from "react";
import "../css/list.css";
import axios from "axios";

const ListInterview = () => {
  const [interviews, setInterviews] = useState([]);
  useEffect(() => {
    const fetcthinterview = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/interviews/allInterview"
        );
        setInterviews(res.data);
        console.log("interview data set");
      } catch (error) {
        console.log("error while calling get all interview", error);
      }
    };
    fetcthinterview();
  }, []);
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
                  <li key={studentId._id}>{studentId.name}</li>
                ))}
              </ul>
            </div>
            <button className="delete-button">Delete</button>
          </div>
        ))
      ) : (
        <p>No interviews available.</p>
      )}
    </div>
  );
};

export default ListInterview;
