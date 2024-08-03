import React from "react";
import { Link } from "react-router-dom";
import "../css/Home.css"; // Import the CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Admin Dashboard</h1>
      <div className="card-container">
        <div className="card">
          <h2>create</h2>
          <p>Add new students to the database.</p>
          <Link to="/addStudent" className="link-button">
            Add Student
          </Link>
        </div>
        <div className="card">
          <h2> Batch</h2>
          <p>Create and manage student batches.</p>
          <Link to="/batch" className="link-button">
            Add Batch
          </Link>
        </div>
        <div className="card">
          <h2>Student</h2>
          <p>View and manage the list of students.</p>
          <Link to="/studentList" className="link-button">
            Student List
          </Link>
        </div>
        <div className="card">
          <h2>Result</h2>
          <p>Create student result for databse</p>
          <Link to="/createResult" className="link-button">
            Create
          </Link>
        </div>
        <div className="card">
          <h2>Download </h2>
          <p>Download the students results in csv format</p>
          <Link to="/downloadcsv" className="link-button">
            Create
          </Link>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Your Company</p>
      </footer>
    </div>
  );
};

export default Home;
