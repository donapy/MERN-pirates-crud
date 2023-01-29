import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const [inputs, setInputs] = useState({});
  // const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/user/newUser/`, inputs);

      alert("The user has been registered");
      setInputs({});
    } catch (error) {
      error.response && alert(error.response.data.message);
    }
  };

  return (
    <div id="register-div" className="m-2 p-3 w-50 bg-white">
      <h2 className="mx-auto">Register</h2>
      <form onSubmit={handleSubmit} className="mx-auto">
        <div>
          <label className="col-6 mx-auto">
            Email:
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Ex: email@email.com"
              value={inputs.email || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label className="col-6 mx-auto">
            Full Name:
            <input
              type="text"
              name="fullname"
              placeholder="Ex: Juan Perez"
              className="form-control"
              value={inputs.fullname || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label className="col-6 mx-auto">
            Password:
            <input
              type="password"
              name="password"
              className="form-control"
              value={inputs.password || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label className="col-6 mx-auto">
            Confirm Password:
            <input
              type="password"
              name="confirmpassword"
              className="form-control"
              value={inputs.confirmpassword || ""}
              onChange={handleChange}
            />
          </label>
        </div>

        <button className="btn btn-primary mt-3 col-6 mx-auto">Register</button>
      </form>
    </div>
  );
};
