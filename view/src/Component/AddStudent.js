// src/components/AddStudentForm.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudentForm = () => {
  const [form, setForm] = useState({
    name: "",
    college: "",
    status: "not_placed",
    batchId: "",
  });
  const [batches, setBatches] = useState([]); // Assuming you have batches data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/batches");
        setBatches(res.data);
      } catch (err) {
        console.error("Error fetching batches:", err);
      }
    };
    fetchBatches();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure the endpoint matches your backend route
      await axios.post("http://localhost:8000/api/student/create", form);
      navigate("/");
    } catch (err) {
      console.error("Error adding student:", err);
    }
  };

  return (
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
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;
