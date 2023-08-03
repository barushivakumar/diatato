import React, { useState, useRef, useEffect } from "react";
import loginbackground from "../../assets/bg_1.jpg";
import logoLogin from "../../assets/logo3.png";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
const Login = ({dispatch}) => {
 
  const loginBackgroundStyle = {
    background: `url(${loginbackground})`,
    position: "absolute",
    width: "100%",
    height: "100%",
  };

  const inputStyle = {
    width: "100%",
    borderRadius: "5px",
    padding: "5px",
    border: "2px solid #D9E1E7",
  };

  const loginButton = {
    width: "100%",
    background: "#34447d",
    borderRadius: "5px",
    border: "none",
    color: "white",
    padding: "5px",
  };

  const signupButton = {
    width: "100%",
    borderRadius: "5px",
    padding: "5px",
    textDecoration: "none",
    background: "white",
    border: "2px solid #D9E1E7",
    color: "black",
  };
  const [showPassword, setshowPassword] = useState(false);
  const handleShowPassword = () => {
    setshowPassword(!showPassword);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const LoginFunction = async (event) => {
    
   
    event.preventDefault();
    //
   
    if (email !== "") {
      console.log("this")
      dispatch({ type: 'ROLE', payload: 'student' });
      localStorage.setItem("loggedIn",true)
      localStorage.setItem("role",'student')
    
    }
  };

  const [loginAs, setloginAs] = useState("");

const handleloginAsChange = (e) => {
  setloginAs(e.target.value);
};
  return (
    <>
      <div
        style={loginBackgroundStyle}
        className="d-flex justify-content-center align-items-center"
      >
        <div >
          <Card className="mb-0" style={{ borderRadius: "20px" }}>
            <CardBody>
              <div className="d-flex justify-content-center align-items-center">
                <img style={{ width: "90px" }} src={logoLogin} />
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ padding: "30px" }}
              >
                <form>
                  <input
                    required
                    className="mb-3"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)
                      setError('')}}
                    style={inputStyle}
                    type="Email"
                    placeholder="Email or Mobile Number"
                  />

                  <br />
                  <div style={{position:'relative'}}>
                    <input
                      required
                      className="mb-3 presloginInputField"
                      style={inputStyle}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) =>{ setPassword(e.target.value)
                        setError("")}}
                      placeholder="Password"
                    />
                    
                    <FontAwesomeIcon style={{position:'absolute',top:'10px',right:'10px',color:'#40485d'}}
                      icon={showPassword ? faEyeSlash : faEye}
                      onClick={handleShowPassword}
                    />
                    {
                    error != '' &&
                  <div style={{color:'red'}}>
                     *{error}
                   </div>
                  }
                  </div>

                  {/* <div className="show-password">
                 <input
                 className="mr-1"
                   type="checkbox"
                   id="showPassword"
                   checked={showPassword}
                   onChange={handleShowPassword}
                 /> 
                  
                 <label htmlFor="showPassword" style={{fontSize:'12px',fontWeight:'bold',color:'gray'}}>
                    {showPassword ? "Hide" : "Show"} Password
                 </label>
             </div> */}
                  <br />

                  {/* <div>
                    Login As:
                    <br/>
                    
                    <input className="mr-1"
                              type="radio"
                              value="customer"
                              checked={loginAs === "customer"}
                              onChange={handleloginAsChange}
                            />
                            <label>
                              <span className="mr-3">
                              Customer

                              </span>
                      
                    </label>
                            
                            
                    <input className="mr-1"
                              type="radio"
                              value="admin"
                              checked={loginAs === "admin"}
                              onChange={handleloginAsChange}
                            />
                            <label>
                      Admin
                    </label>

                  </div> */}

                  <button className="mb-3" style={loginButton} onClick={LoginFunction}>
                    {" "}
                    LOGIN
                  </button>

                  <br />
                 
                </form>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default connect() (Login);
