import React, { useState, useRef, useEffect } from "react";
import loginbackground from '../../assets/bg_1.jpg';
import logoLogin from "../../assets/logo3.png";
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const ForgetPasswordOTP = () => {
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState("");

  const loginBackgroundStyle = {
    background: `url(${loginbackground})`,
    position:'absolute',
    width:'100%',
    height:'100%'
  }

  const inputStyle = {
    width:'100%',
    borderRadius:'5px',
    padding:'5px',
    border:'2px solid #D9E1E7'
  }

  const loginButton = {
    width:'100%',
    background: "#34447d",
    borderRadius:'5px',
    border:'none',
    color:'white',
    padding:'5px'
  }

 
  const VerifyOTPFun = async (event) => {
    event.preventDefault();
    console.log(OTP,localStorage.getItem("verifyMail"),Password)
   
    if (Password === ConfirmPassword && OTP !== "") {
      axios.post(`${process.env.REACT_APP_URL}/auth/reset-password`, {
        otp: OTP,
        email: localStorage.getItem("verifyMail"),
        password:Password
      })
    
      .then((response) => {
        console.log(response);
        alert("Reset Password Successful")
        window.location.href="/"
      } )
      .catch((error) => {
        
                      console.log(error);
                      setError(error.response.data.message)
      });
  
    
      
    }
    else{
      if(OTP === ""){
        setError("Enter OTP")
      }
      else if(Password != ConfirmPassword){
        setError("Password and confirm password doesn't match")
      }
      else{
        setError("Fill the details")
      }
    }
  }

  const [showPassword, setshowPassword] = useState(false);
  const handleShowPassword = () => {
    setshowPassword(!showPassword);
  };
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () => {
    setshowConfirmPassword(!showConfirmPassword);
  };
  return (
   <>
     <div style={loginBackgroundStyle} className="d-flex justify-content-center align-items-center">
        <div>
        <Card className="mb-0" style={{borderRadius:'20px'}}>
                                            <CardBody>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <img style={{ width: "90px" }} src={logoLogin}  />
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center" style={{padding:'30px'}}>
                                                    <form onSubmit={VerifyOTPFun}>
                                                    <div style={{position:'relative'}}>
                    <input
                      required
                      className=" presloginInputField"
                      style={inputStyle}
                      type={showPassword ? "text" : "password"}
                      value={Password}
                      onChange={(e) => {setPassword(e.target.value)
                        setError('')}}
                      placeholder="Password"
                    />
                    
                    <FontAwesomeIcon style={{position:'absolute',top:'10px',right:'10px',color:'#40485d'}}
                      icon={showPassword ? faEyeSlash : faEye}
                      onClick={handleShowPassword}
                    />
                  </div>  
                                                        <br/>
                                                        <div style={{position:'relative'}}>
  <input
    required
    className="presloginInputField"
    style={inputStyle}
    type={showConfirmPassword ? "text" : "password"}
    value={ConfirmPassword}
    onChange={(e) => {setConfirmPassword(e.target.value)
    setError('')}}
    placeholder="Confirm Password"
  />
  
  <FontAwesomeIcon style={{position:'absolute',top:'10px',right:'10px',color:'#40485d'}}
    icon={showConfirmPassword ? faEyeSlash : faEye}
    onClick={handleShowConfirmPassword}
  />
</div>
                                                        <br/>
                                                        <input required value={OTP}
                    onChange={(e) => {setOTP(e.target.value)
                      setError('')}} className="mb-3" style={inputStyle} type="OTP" placeholder="OTP"/>
                                                        
                                                        <br/>
                                                        {
                    error != '' &&
                  <div style={{color:'red'}}>
                     *{error}
                   </div>
                  }
                                                        <button className="mb-3" style={loginButton} type="submit">VERIFY</button>

                                                    </form>
                                                   
                                                </div>
                                                
                                              
                                                

                                            </CardBody>
                                        </Card>
        </div>
     </div>
   </>
  );
}


export default ForgetPasswordOTP;