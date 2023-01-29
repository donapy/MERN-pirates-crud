import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPirates } from "./MapPirates";

export const ListPirate = () => {
  const [pirate, setPirate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const pirata = await axios.get(
        "http://localhost:5000/api/pirate/getPirate/",
        {
          withCredentials: true,
        }
      );
      setPirate(pirata.data);
    };
    fetchData();
  }, []);

  const navigate = new useNavigate();
  const handleNew = () => {
    navigate("/pirate/new");
  };

  return (
    <div>
      <div className="container d-flex mb-0 text-center bg-primary align-items-center">
        <div className="flex-grow-1">
          <h1>Welcome to Pirate Crew</h1>
        </div>
        <div>
          <button onClick={handleNew} className="btn btn-warning">
            Add Crew
          </button>
        </div>
      </div>
      <div className="container bg-primary-subtle p-4">
        {pirate && <MapPirates items={pirate} />}
      </div>
    </div>
  );
};
