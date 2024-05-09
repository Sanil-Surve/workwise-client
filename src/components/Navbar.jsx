import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logoutUser } from "../app/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const { currentUser } = useSelector(selectUser);
  const firstName = currentUser?.user?.firstName;
  const lastName = currentUser?.user?.lastName;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => { 
    try {
      const res = await axios.post("http://localhost:8080/sign-out");

      console.log(res)

      dispatch(logoutUser());
      navigate("/login");
      
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">
          <i className="fi fi-rr-edit"></i>WorkWise
        </Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/home" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/list" className="nav-link">
            Employee List
          </Link>
        </li>
      </ul>
      <div className="navbar-user">
        <span className="user-name">{firstName} {lastName}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
