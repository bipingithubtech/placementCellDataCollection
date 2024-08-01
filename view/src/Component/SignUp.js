import React, { useState } from "react";
import "../css/Registration.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/register",
        register,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res.data);
      setRegister({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (err) {
      console.error(
        "Error while sending post request to backend:",
        err.response ? err.response.data : err.message
      );
    }
  };
  return (
    <>
      <div className="main">
        <div className="registration-form">
          <h2>Register</h2>

          <form onSubmit={HandleSubmit}>
            <div className="form-group">
              <label
                htmlFor="name"
                style={{ color: "white", fontSize: "20px" }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={register.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="email"
                style={{ color: "white", fontSize: "20px" }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={register.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="password"
                style={{ color: "white", fontSize: "20px" }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={register.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
