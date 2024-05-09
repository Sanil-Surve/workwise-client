import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeData = ({ employees, onDelete }) => {
  const navigate = useNavigate();
  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <>
      {employees.map((employee, index) => (
        <tr key={employee._id}>
          <td>{index + 1}</td> 
          <td>
            <img src={employee.image} alt="Employee" style={{ width: 100 }} />
          </td>
          <td>{employee.name}</td>
          <td>{employee.email}</td>
          <td>{employee.mobile}</td>
          <td>{employee.designation}</td>
          <td>{employee.gender}</td>
          <td>{employee.course.join(", ")}</td>
          <td>{employee.createdDate}</td>
          <td>
            <button onClick={() => navigate(`/update-employee/${employee._id}`)}>Edit</button>
            <br />
            <button onClick={() => handleDelete(employee._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default EmployeeData;


