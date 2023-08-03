import React, { useState, useRef, useEffect } from "react";
import loginbackground from '../../assets/bg_1.jpg';
import logoLogin from "../../assets/logo3.png";
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

const SuccessSignup = () => {

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

  const signupButton = {
    width:'100%',
    borderRadius:'5px',
    padding:'5px',
    textDecoration:'none',
    background:'white',
    border:'2px solid #D9E1E7',
    color:'black'
  }

  const LoginFunction = async (event) => {
    event.preventDefault();
     window.location.href="/dashboard";
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
                                                <div  className="d-flex justify-content-center align-items-center" >
                                                   <div style={{padding:'30px'}}>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <b>
                                                            Thanks for Signing Up
                                                        </b>
                                                    </div>
                                                    <br/>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        Please check your email to Activate your account
                                                    </div>
                                                   </div>
                                                   
                                                </div>
                                                
                                              
                                                

                                            </CardBody>
                                        </Card>
        </div>
     </div>
   </>
  );
}


export default SuccessSignup;