import React from "react";
import { Login } from "./Login";
import { Register } from "./Register";

export const Home = () => {
  return (
    <div>
      <div>
        <h1 className="container mb-0 text-center bg-primary">
          Welcome to Pirate Crew
        </h1>
      </div>
      <div className="container d-flex flex-row  bg-primary-subtle">
        <Register />
        <Login />
      </div>
    </div>
  );
};
