import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/user/loginUser/`, inputs, {
        withCredentials: true,
      });

      alert(`Login Successful`);
      navigate("/pirate");
    } catch (error) {
      error.response && alert(error.response.data.message);
    }
  };

  return (
    <div id="login-div" className="m-2 p-3 w-50 bg-white ">
      <h2 className="mx-auto">Login User</h2>
      <form onSubmit={handleSubmit} className="mx-auto">
        <div>
          <label className="col-6 mx-auto">
            Email:
            <input
              type="text"
              name="email"
              value={inputs.email || ""}
              placeholder="Ex: email@email.com"
              onChange={handleChange}
              className="form-control"
            />
          </label>
        </div>
        <div>
          <label className="col-6 mx-auto">
            Password:
            <input
              type="password"
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
              className="form-control"
            />
          </label>
        </div>

        <button className="btn btn-primary mt-3 col-6 mx-auto">Login</button>
      </form>
    </div>
  );
};
