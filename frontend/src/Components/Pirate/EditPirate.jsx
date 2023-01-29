import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const EditPirate = () => {
  const [pirate, setPirate] = useState(false);

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const pirata = await axios.get(
        `http://localhost:5000/api/pirate/getPirate/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(pirata.data[0]);
      setPirate(pirata.data[0]);
    };
    fetchData();
  }, [id]);

  const handleChange = async (e) => {
    const name = e.target.name;
    setPirate((values) => ({ ...values, [name]: !pirate[name] }));
  };

  const handleSubmit = async () => {
    const pirata = await axios.put(
      "http://localhost:5000/api/pirate/updatePirate/" + id,
      pirate,
      {
        withCredentials: true,
      }
    );
    if (pirata.status === 200) {
      alert("Pirate Updated");
      navigate("/pirate");
    }
  };

  const handleBack = () => {
    navigate("/pirate/");
  };

  return (
    <>
      {pirate && (
        <div>
          <div className="container d-flex mb-0 text-center bg-primary align-items-center">
            <div className="flex-grow-1">
              <h1>{pirate.name}</h1>
            </div>
            <div>
              <button onClick={handleBack} className="btn btn-success">
                Crew List
              </button>
            </div>
          </div>

          <div className="container bg-primary-subtle p-4 d-flex flex-col justify-content-evenly">
            <div className="w-50 me-4">
              <img src={pirate.imgurl} alt="pirate" height="350px" />
              <h2 className="mt-4">{pirate.phrase}</h2>
            </div>

            <div className="bg-white w-50 ms-4 p-4">
              <h3 className="mb-4">About</h3>
              <p>Position: {pirate.position}</p>
              <p>Treasures: {pirate.chests}</p>
              <p>
                Peg Leg: {pirate.pegleg ? "Yes" : "No"}{" "}
                <input
                  type="checkbox"
                  name="pegleg"
                  onChange={handleChange}
                  checked={pirate.pegleg}
                />
              </p>
              <p>
                Eye Patch: {pirate.eyepatch ? "Yes" : "No"}{" "}
                <input
                  type="checkbox"
                  name="eyepatch"
                  onChange={handleChange}
                  checked={pirate.eyepatch}
                />
              </p>
              <p>
                Hook Hand: {pirate.hookhand ? "Yes" : "No"}{" "}
                <input
                  type="checkbox"
                  name="hookhand"
                  onChange={handleChange}
                  checked={pirate.hookhand}
                />
              </p>
              <button onClick={handleSubmit} className="btn btn-primary">
                Submit Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
