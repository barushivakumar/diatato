import React, { useState, useRef, useEffect } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidemenu/Sidebar";
import "../Dashboard/dashboard.css"
import alldata from "../Dashboard/sampledata.json"
import Initialform from "./initialform";
const Dashboard = () => {
  const studentdata=alldata.schools[0].teachers[0].students[0]
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dob: '',
    address: '',
    class: '',
    height: '',
    weight: '',
    bmi: '',
    enrollmentNumber: '',
    admissionNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate BMI here if needed
    // Submit the form data to your backend or perform any necessary actions

  };

  return (
    <>
      <Header />
      <div className="app d-flex " style={{ position: 'absolute', width: '100%', height: 'calc(100vh - 120px)' }}>
        <Sidebar />
        <div className="componentContainer">
          <div className="ComponentInnerContainer" style={{ padding: '20px' }}>

            Dashboard
          </div>
          <Initialform></Initialform>

        </div>
      </div>

    </>
  );
}


export default Dashboard;