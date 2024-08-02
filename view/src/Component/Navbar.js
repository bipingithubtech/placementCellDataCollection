import { useContext } from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { FaUserSecret } from "react-icons/fa6";
import { FaUserSlash } from "react-icons/fa";

import { IoIosLogOut } from "react-icons/io";
import UserContext from "../Store/ContextApi";
import axios from "axios";

const Navbar = () => {
  const { token, setToken } = useContext(UserContext);

  const logout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user/logout");
      setToken(null);
    } catch {
      console.log("error while logout");
    }
  };
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
            <Link className="link" to="/interviews/add">
              Create
            </Link>
          </li>
          <li>
            <Link className="link" to="/listInterview">
              Interview
            </Link>
          </li>
        </ul>
        {token ? (
          <div className="logout-container" onClick={logout}>
            <a>
              {" "}
              <span className="logout-text">Logout</span>
            </a>
          </div>
        ) : (
          <div className="signup-container">
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                fontSize: "2rem",
                color: "green",
                fontWeight: "bold",
              }}
            >
              <span className="logout-icon">Sign Up</span>
            </Link>
          </div>
        )}

        <div className="nav_user">
          {token ? (
            <div>
              <FaUserSecret className="user_exist" /> &nsbps
              <span className="user_name">{token.name}</span>
            </div>
          ) : (
            <div>
              <FaUserSlash className="user_exist" />
              <span className="user_name">No user</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
