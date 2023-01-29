import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const NewPirate = () => {
  const [inputs, setInputs] = useState({
    pegleg: true,
    eyepatch: true,
    hookhand: true,
    position: "First Mate",
    chests: 0,
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "pegleg" || name === "eyepatch" || name === "hookhand") {
      setInputs((values) => ({ ...values, [name]: !inputs[name] }));
    } else {
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        `http://localhost:5000/api/pirate/newPirate/`,
        inputs,
        {
          withCredentials: true,
        }
      );
      if (result.status === 201) {
        alert("The pirate has been registered");
        navigate("/pirate");
      }
    } catch (error) {
      error.response && alert(error.response.data.message);
    }
  };

  const handleBack = () => {
    navigate("/pirate/");
  };

  return (
    <div>
      <div className="container d-flex mb-0 text-center bg-primary align-items-center">
        <div className="flex-grow-1">
          <h1>Add Pirate</h1>
        </div>
        <div>
          <button onClick={handleBack} className="btn btn-success">
            Crew List
          </button>
        </div>
      </div>
      <div id="registerPirate-div">
        <form onSubmit={handleSubmit} className="mx-auto">
          <div className="container bg-primary-subtle p-4 d-flex flex-col justify-content-evenly">
            <div className="w-50">
              <div>
                <label className="col-6 mx-auto">
                  Pirate Name:
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Ex: Luffy"
                    value={inputs.name || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className="col-6 mx-auto mt-4">
                  Image Url:
                  <input
                    type="text"
                    name="imgurl"
                    className="form-control"
                    value={inputs.imgurl || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className="col-6 mx-auto mt-4">
                  # of Treasure Chests:
                  <input
                    type="number"
                    name="chests"
                    className="form-control"
                    value={inputs.chests || 0}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className="col-6 mx-auto mt-4">
                  Pirate Catch Phrase:
                  <input
                    type="text"
                    name="phrase"
                    className="form-control"
                    value={inputs.phrase || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className="w-50">
              <div>
                <label className="col-6 mx-auto ">
                  Crew Position:
                  <select
                    className="form-control"
                    name="position"
                    onChange={handleChange}
                  >
                    <option value="First Mate">First Mate</option>
                    <option value="Captain">Captain</option>
                    <option value="Quarter Master">Quarter Master</option>
                    <option value="Boatswain">Boatswain</option>
                    <option value="Powder Monkey">Powder Monkey</option>
                  </select>
                </label>
              </div>
              <div>
                <label className="mt-4">
                  <input
                    type="checkbox"
                    name="pegleg"
                    onChange={handleChange}
                    checked={inputs.pegleg}
                  />
                  Peg Leg
                </label>
              </div>
              <div>
                <label className="mt-3">
                  <input
                    type="checkbox"
                    name="eyepatch"
                    onChange={handleChange}
                    checked={inputs.eyepatch}
                  />
                  Eye Patch
                </label>
              </div>
              <div>
                <label className="mt-3">
                  <input
                    type="checkbox"
                    name="hookhand"
                    onChange={handleChange}
                    checked={inputs.hookhand}
                  />
                  Hook Hand
                </label>
              </div>
              <button className="btn btn-primary mt-4 col-6 mx-auto">
                Add Pirate
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
