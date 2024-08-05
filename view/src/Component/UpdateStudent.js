import React from "react";
import "../css/AddStudent.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateStudent = () => {
  const [form, setForm] = useState({
    name: "",
    college: "",
    status: "not_placed",
    batchId: "",
  });
  const [student, setStudent] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchallStudent = async () => {
      try {
        const res = await axios.get(`/api/student/${id}`);
        setStudent(res.data);
        setForm({
          name: res.data.name,
          college: res.data.college,
          status: res.data.status,
          batchId: res.data.batchId,
        });
      } catch (err) {
        console.error("Error fetching student data:", err);
      }
    };
    const fetchBatches = async () => {
      try {
        const res = await axios.get("/api/batches");
        setBatches(res.data);
      } catch (err) {
        console.error("Error fetching batches:", err);
      }
    };
    fetchallStudent();
    fetchBatches();
  }, [id]);
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/student/update/${id}`, form);
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.error("Error adding student:", err);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Update Details</h2>
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
          <button type="submit">update</button>
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

export default UpdateStudent;
