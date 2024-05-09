import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    image: null,
  });

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
      reader.readAsDataURL(file); // Convert the file to Base64 data URL
    } else {
      alert("Please upload a valid PNG or JPG image.");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Employee Created successfully:', data);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        course: [],
        image: null,
      });
      navigate("/list");
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };



  return (
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;




