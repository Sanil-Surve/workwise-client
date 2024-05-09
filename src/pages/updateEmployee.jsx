import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/UpdateEmployee.css";
import Navbar from "../components/Navbar";

const updateEmployee = () => { 
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    image: null,
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/employee/${id}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }
        const data = await response.json();
        setFormData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [id]); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedCourse = checked
        ? [...formData.course, value]
        : formData.course.filter((course) => course !== value);
      setFormData({
        ...formData,
        course: updatedCourse,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file); 
    } else {
      alert("Please upload a valid PNG or JPG image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/employee/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update employee data");
      }
      const data = await response.json();
      console.log("Employee updated successfully:", data);
      navigate("/list")
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };
  return (
    <>
    <Navbar />
    <br />
    <h2 className="update">Update Employee</h2>
    <br />
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Mobile No:</label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Designation:</label>
        <select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          required
        >
          <option value="">Select Designation</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>
      <div>
        <label>Gender:</label>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
              required
            />
            Male
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
              required
            />
            Female
          </label>
        </div>
      </div>
      <div>
        <label>Course:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="MCA"
              value="MCA"
              checked={formData.course.includes("MCA")}
              onChange={handleChange}
            />
            MCA
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="BCA"
              value="BCA"
              checked={formData.course.includes("BCA")}
              onChange={handleChange}
            />
            BCA
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="BSC"
              value="BSC"
              checked={formData.course.includes("BSC")}
              onChange={handleChange}
            />
            BSC
          </label>
        </div>
      </div>

      <div>
        <label>Upload Image (PNG/JPG only):</label>
        <input
          type="file"
          accept=".png, .jpg"
          onChange={handleImageChange}
          required
        />
      </div>
      <button type="submit">Update</button>
    </form>
    </>
  );
};

export default updateEmployee;
