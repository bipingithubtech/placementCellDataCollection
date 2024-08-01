import React, { useContext } from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="nav_main">
      <div className="nav_ul">
        <h1 style={{ fontFamily: "cursive" }}>
          <Link className="link" to="/home">
            PlacementCell
          </Link>
        </h1>
        <ul className="list">
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/about">
              interview
            </Link>
          </li>
          <li>
            <Link className="link" to="/interviews/add">
              CreateInterview
            </Link>
          </li>
        </ul>

        <div className="logout-container">
          <Link to="/logout" className="logout-link">
            <IoIosLogOut className="logout-icon" />
            <span className="logout-text">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
