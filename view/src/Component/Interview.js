import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Interview.css";

const Interview = () => {
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    companyName: "",
    date: "",
    batchId: "",
    allocatedStudents: [],
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/student/getall");
        setStudents(res.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const getBatches = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/batches");
        setBatches(res.data);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };

    fetchStudents();
    getBatches();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, options } = e.target;

    if (type === "select-multiple") {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setForm((prev) => ({ ...prev, [name]: selectedValues }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/interviews/create",
        form
      );
      console.log("Interview created:", res.data);
      alert("Interview created successfully!");
      setForm({
        companyName: "",
        date: "",
        batchId: "",
        allocatedStudents: [],
      });
    } catch (error) {
      console.error("Error creating interview:", error);
      alert("Failed to create interview. Please try again.");
    }
  };

  return (
    <div className="interview-container">
      <div className="interview-form-container">
        <h2>Create Interview</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              required
              value={form.companyName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              required
              value={form.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Batch</label>
            <select
              name="batchId"
              required
              value={form.batchId}
              onChange={handleChange}
            >
              <option value="">Select a batch</option>
              {batches.map((batch) => (
                <option key={batch._id} value={batch._id}>
                  {batch.batchName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Allocate Students</label>
            <select
              name="allocatedStudents"
              multiple
              value={form.allocatedStudents}
              onChange={handleChange}
            >
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Create Interview</button>
        </form>
      </div>
    </div>
  );
};

export default Interview;
