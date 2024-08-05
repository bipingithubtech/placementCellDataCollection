// src/components/AddStudentForm.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/AddStudent.css"; // Import the CSS file

const AddStudentForm = () => {
  const [form, setForm] = useState({
    name: "",
    college: "",
    status: "not_placed",
    courseScores: {
      dsaFinalScore: "",
      webdFinalScore: "",
      reactFinalScore: "",
    },
    batchId: "",
  });
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await axios.get("/api/batches");
        setBatches(res.data);
      } catch (err) {
        console.error("Error fetching batches:", err);
      }
    };
    fetchBatches();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("courseScores.")) {
      const scoreName = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        courseScores: {
          ...prev.courseScores,
          [scoreName]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/student/create", form);
      navigate("/");
    } catch (err) {
      console.error("Error adding student:", err);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>College</label>
            <input
              type="text"
              name="college"
              value={form.college}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="not_placed">Not Placed</option>
              <option value="placed">Placed</option>
            </select>
          </div>
          <div>
            <label>Batch</label>
            <select
              name="batchId"
              value={form.batchId}
              onChange={handleChange}
              required
            >
              {batches.map((batch) => (
                <option key={batch._id} value={batch._id}>
                  {batch.batchName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>DSA Final Score</label>
            <input
              type="number"
              name="courseScores.dsaFinalScore"
              value={form.courseScores.dsaFinalScore}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Web Development Final Score</label>
            <input
              type="number"
              name="courseScores.webdFinalScore"
              value={form.courseScores.webdFinalScore}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>React Final Score</label>
            <input
              type="number"
              name="courseScores.reactFinalScore"
              value={form.courseScores.reactFinalScore}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add Student</button>
        </form>
      </div>
      <div className="image-container">
        <div className="image-overlay">
          <div className="image-overlay-content">
            <h1>Welcome to Student Portal</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentForm;
