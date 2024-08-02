import React, { useEffect, useState } from "react";
import "../css/StudentList.css";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const FetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/student/getall");
        console.log("data", res.data);
        if (Array.isArray(res.data)) {
          setStudents(res.data);
        } else {
          console.error("Unexpected data format:", res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    FetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/student/${id}`);
      setStudents(students.filter((student) => student._id !== id));
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };
  const handleUpdate = (id) => {
    navigate(`/updatePage/${id}`);
  };

  return (
    <div className="student-list">
      {students.map((student) => (
        <div key={student._id} className="student-card">
          <div className="student-info">
            <h3>{student.name}</h3>
            <p>College: {student.college}</p>
            <p>Status: {student.status}</p>
            <p>Batch: {student.batchId.batchName}</p>{" "}
            {/* Assuming batchName is part of student data */}
          </div>
          <div className="student-actions">
            <button onClick={() => handleUpdate(student._id)}>
              <FaEdit /> Edit
            </button>
            <button onClick={() => handleDelete(student._id)}>
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
