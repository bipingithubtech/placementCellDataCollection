import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/CreateResult.css";

const CreteResult = () => {
  const [interviews, setInterviews] = useState([]);
  const [students, setStudents] = useState([]);
  const [interviewId, setInterviewId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchInterviewsAndStudents = async () => {
      try {
        const [interviewRes, studentRes] = await Promise.all([
          axios.get("/api/interviews/allInterview"),
          axios.get("/api/student/getall"),
        ]);
        setInterviews(interviewRes.data);
        setStudents(studentRes.data);
      } catch (error) {
        console.error("Error fetching interviews or students", error);
      }
    };

    fetchInterviewsAndStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/StudentResult/addResult", {
        interviewId,
        studentId,
        result,
      });
      alert("Result added successfully");
      setInterviewId("");
      setStudentId("");
      setResult("");
    } catch (error) {
      alert("Error adding result");
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Add Interview Result</h2>
        <form onSubmit={handleSubmit}>
          <select
            value={interviewId}
            onChange={(e) => setInterviewId(e.target.value)}
            required
          >
            <option value="">Select Interview</option>
            {interviews.map((interview) => (
              <option key={interview._id} value={interview._id}>
                {interview.companyName} -{" "}
                {new Date(interview.date).toLocaleDateString()}
              </option>
            ))}
          </select>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
          <select
            value={result}
            onChange={(e) => setResult(e.target.value)}
            required
          >
            <option value="">Select Result</option>
            <option value="PASS">PASS</option>
            <option value="FAIL">FAIL</option>
            <option value="On Hold">On Hold</option>
            <option value="Didn't Attempt">Didn't Attempt</option>
          </select>
          <button type="submit">Add Result</button>
        </form>
      </div>
    </div>
  );
};

export default CreteResult;
