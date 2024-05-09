import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmployeeData from "../components/EmployeeData";
import "../styles/EmployeeList.css";

const EMPLOYEE_API = "http://localhost:8080/employees";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const fetchEmployees = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (Array.isArray(data)) {
        setEmployees(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchEmployees(EMPLOYEE_API);
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/employee/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      console.log(data);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Keyword..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <NavLink to="/create-employee" className="create-employee-class" >Create Employee</NavLink>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <EmployeeData employees={filteredEmployees} onDelete={deleteEmployee} />
        </tbody>
      </table>
    </>
  );
}

export default EmployeeList;


