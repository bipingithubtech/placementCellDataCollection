import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/addStudent">add</Link>
      <Link to="/batch">ADD_Batch</Link>
      <Link to="studentList">student</Link>
    </div>
  );
};

export default Home;
