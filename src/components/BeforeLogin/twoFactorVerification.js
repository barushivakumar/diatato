import React, { useState, useRef, useEffect } from "react";
import loginbackground from '../../assets/bg_1.jpg';
import logoLogin from "../../assets/logo3.png";
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import axios from 'axios';
const TwoFactorVerification = () => {
console.log(localStorage.getItem('EmailForVerification'))
  const loginBackgroundStyle = {
    background: `url(${loginbackground})`,
    position:'absolute',
    width:'100%',
    height:'100%'
  }

  const inputElement={
    position:'relative'
  }
  const verifyButton ={
    position:'absolute',
    right:'0px',
    top:'0px',
    width: "30%",
    background: "#34447d",
    borderRadius: "5px",
    border: "none",
    color: "white",
    padding: "5px",
    height:'70%',
    cursor:'pointer'
  }
  const inputStyle = {
    width:'100%',
    borderRadius:'5px',
    padding:'5px',
    border:'2px solid #D9E1E7'
  }
  const signUpButton = {
    
    width: "50%",
    background: "#34447d",
    borderRadius: "5px",
    border: "none",
    color: "white",
    padding: "5px",
    textDecoration:'none',
    textAlign:'center'
  };
 
  const [OTP, setOTP] = useState("");
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [SuccessVerify, setSuccessVerify] = useState(false);
  const LoginFunction = async (event) => {
    event.preventDefault();
     window.location.href="/";
  }
  const [SuccessPopup, setSuccessPopup] = useState(false);
  async function OTPVerify(e){
    e.preventDefault()
    const obj = {
      "email": localStorage.getItem('EmailForVerification'),
      "otp":OTP
  }
 
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/auth/verify-email`, obj, {
       
      });
      console.log(response.data.message);
      setSuccessMsg(response.data.message);
      setSuccessVerify(true)
      setSuccessPopup(true)
      
      setOTP('')
    } catch (error) {
      console.error(error)
      alert("Wrong OTP, try again")
    }

  }
  return (
   <>
     <div style={loginBackgroundStyle} className="d-flex justify-content-center align-items-center">
        <div style={{width:'20%'}}>
        <Card className="mb-0" style={{borderRadius:'10px'}}>
                                            <CardBody>
                                                <div className="mb-3 d-flex justify-content-center align-items-center">
                                                    <img style={{ width: "90px" }} src={logoLogin}  />
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center">
                <form>
                    <div style={inputElement}>
                 <input required  className="mb-3" style={inputStyle} type="text"  value={OTP}
                    onChange={(e) => {setOTP(e.target.value);
                     setSuccessMsg("")}} placeholder="Email OTP" />
                  <button style={verifyButton} onClick={OTPVerify}>Verify</button>
                    </div>
                    {
                      SuccessMsg &&
                      <div style={{textAlign:'center',fontWeight:'bold'}}>
                        {SuccessMsg}
                      </div>
                    }
                 <br/>
                 {/* <div style={inputElement}>
                 <input required  className="mb-3" style={inputStyle} type="text" placeholder="Mobile OTP" />
                  <div style={verifyButton} >Verify</div>
                    </div> */}
                 <br/>
                 <div style={{display:'flex',
    justifyContent:'center'}}>
              {
                SuccessPopup  ? 
<Link to='/'  style={signUpButton} type="submit">Done</Link>
:
<Link  onClick={()=>{setSuccessMsg("Please Verify")}} style={signUpButton} >Done</Link>

              }
                 
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


export default TwoFactorVerification;