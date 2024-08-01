import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/BatchList.css"; // Import your CSS file

const BatchList = () => {
  const [batches, setBatches] = useState([]);
  const [batchName, setBatchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [course, setCourse] = useState("");

  const batchData = {
    batchName,
    startDate,
    endDate,
    course,
  };
  const getBatches = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/batches");
      setBatches(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch batches on component mount
  useEffect(() => {
    getBatches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/batches/create", batchData);
      setBatchName("");
      setStartDate("");
      setEndDate("");
      setCourse("");
      // Optionally, refresh the list of batches
      const res = await axios.get("http://localhost:8000/api/batches");
      setBatches(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="batch-list-container">
      <div className="batch-list">
        <h2>Batch List</h2>
        <ul>
          {batches.map((batch) => (
            <li key={batch._id} className="batch-box">
              <h3>{batch.batchName}</h3>
              <p>Course: {batch.course}</p>
              <p>
                {new Date(batch.startDate).toLocaleDateString()} to{" "}
                {new Date(batch.endDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="form-container">
        <h2>Add New Batch</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
            placeholder="Batch Name"
            required
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Course"
            required
          />
          <button type="submit">Add Batch</button>
        </form>
      </div>
    </div>
  );
};

export default BatchList;
