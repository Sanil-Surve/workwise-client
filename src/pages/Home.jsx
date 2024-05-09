import React from "react";
import "../styles/Home.css";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1>Welcome to Admin Panel</h1>
      </div>
    </>
  );
};

export default Home;
