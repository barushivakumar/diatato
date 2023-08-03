import React, { useState, useRef, useEffect } from "react";
import loginbackground from '../../assets/bg_1.jpg';
import logoLogin from "../../assets/logo3.png";
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
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

 
  const ForgetPasswordFunction = async (event) => {
    event.preventDefault();
    console.log(email)
 
    if (email !== "") {
      axios.post(`${process.env.REACT_APP_URL}/auth/forgot-password-otp`, {
        email: email
      })
    
      .then((response) => {
        console.log(response);
        localStorage.setItem("verifyMail",email)
        alert("OTP for reset password has been successfully sent")
        window.location.href="/ForgotPasswordOTP"
      } )
      .catch((error) => {
        
                      console.log(error);
                    
                      setError(error.response.data.message)
      });
  
    
      
    }
  }
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
                                                    <form onSubmit={ForgetPasswordFunction}>
                                                        
                                                        <input required value={email}
                    onChange={(e) => {setEmail(e.target.value)
                      setError('')}} className="mb-3" style={inputStyle} type="Email" placeholder="Email"/>
                                                        
                                                        <br/>
                                                        {
                    error != '' &&
                  <div style={{color:'red'}}>
                     *{error}
                   </div>
                  }
                                                        <button className="mb-3" style={loginButton} type="submit">RESET PASSWORD</button>

                                                        <br/>
          

                                                        <div className="d-flex justify-content-center align-items-center " style={{color:'gray'}}>
                                                               <small>
                                                               
                                                               <Link to="/" style={{color:'gray'}}>Login</Link> | <Link to="/signup" style={{color:'gray'}}>Sign Up</Link>
                                                                </small>  
                                                              </div>

                                                    </form>
                                                   
                                                </div>
                                                
                                              
                                                

                                            </CardBody>
                                        </Card>
        </div>
     </div>
   </>
  );
}


export default ForgotPassword;