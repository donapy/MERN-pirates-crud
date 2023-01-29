import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const MapPirates = (props) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    let confirmation = window.confirm(
      "Are you sure you want to delete this pirate?"
    );
    if (confirmation) {
      try {
        await axios.delete(
          `http://localhost:5000/api/pirate/deletePirate/${id}`,
          {
            withCredentials: true,
          }
        );
        alert("Pirate Deleted");
        navigate(0);
      } catch (error) {
        error.response && alert(error.response.data.message);
      }
    }
  };

  return (
    <div>
      {props.items.map((pirate, key) => {
        return (
          <div
            key={key}
            className="container d-flex justify-content-evenly bg-light mb-4 p-4 w-75"
          >
            <div className="me-2 w-25">
              <img src={pirate.imgurl} alt="pirate" height="100px" />
            </div>

            <div className="w-50">
              <div className="mb-4">
                <h4>{pirate.name}</h4>
              </div>
              <div className="container d-flex justify-content-center align-items-center">
                <Link
                  to={"/pirate/edit/" + pirate._id}
                  className="me-3 btn btn-primary"
                >
                  View Pirate
                </Link>
                <button
                  onClick={() => handleDelete(pirate._id)}
                  className="ms-3 btn btn-danger"
                >
                  Walk to Plank
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
