import React, { useState, useRef, useEffect } from "react";
import loginbackground from "../../assets/bg_1.jpg";
import logoLogin from "../../assets/logo3.png";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
const SignUp = () => {
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

  const signUpButton = {
    width: "50%",
    background: "#34447d",
    borderRadius: "5px",
    border: "none",
    color: "white",
    padding: "5px",
  };
  const [showPassword, setshowPassword] = useState(false);
  const handleShowPassword = () => {
    setshowPassword(!showPassword);
  };
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () => {
    setshowConfirmPassword(!showConfirmPassword);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [LinkButton, setLinkButton] = useState(false);
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const LoginFunction = async (event) => {
    event.preventDefault();
    
    if(password === Confirmpassword){

      const obj = {
        "email": email,
        "password": password,
        "user_type_id": 3,
        "first_name": FirstName,
        "last_name": LastName,
        "mobile": Mobile
    }
   
      try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/auth/customer-sign-up`, obj, {
         
        });
        // window.location.href = "/TwoFactorVerification";
        localStorage.setItem("EmailForVerification",email)
        setLinkButton(true)
        console.log(response);
        setSuccessPopup(true)
       
      } catch (error) {
        console.error(error.response.data.message);
        alert(`${email} Already Exists`)
      }
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setMobile('')
    }
    else{
      setError("Password and ConfirmPassword doesn't match")
    }
  };
  return (
    <>
      <div
        style={loginBackgroundStyle}
        className="d-flex justify-content-center align-items-center"
      >
        <div>
          <Card className="mb-0" style={{ borderRadius: "20px" }}>
            <CardBody>
              <div className="d-flex justify-content-center align-items-center">
                <img style={{ width: "90px" }} src={logoLogin} />
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <form onSubmit={LoginFunction}>
                <div className="d-flex mt-3">
                  <input
                    required
                    className=" mr-3"
                    style={inputStyle}
                    type="text"
                    placeholder="First Name"
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

<input
                    required
                    style={inputStyle}
                    type="text"
                    placeholder="Last Name"
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  </div>

                  <br />

                  <div className="d-flex">
                    <input
                      required
                      className="mb-3 mr-3"
                      style={inputStyle}
                      type="email"
                      placeholder="Email"
                      value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                      required
                      className="mb-3"
                      style={inputStyle}
                      type="tel"
                      placeholder="Mobile"
                      value={Mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                  <div className="d-flex">
                    <div className="mr-3">

                  <div style={{position:'relative'}}>
                    <input
                      required
                      className=" presloginInputField"
                      style={inputStyle}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {setPassword(e.target.value)
                        setError('')}}
                      placeholder="Password"
                    />
                    
                    <FontAwesomeIcon style={{position:'absolute',top:'10px',right:'10px',color:'#40485d'}}
                      icon={showPassword ? faEyeSlash : faEye}
                      onClick={handleShowPassword}
                    />
                  </div>
                    </div>
                    <div >

<div style={{position:'relative'}}>
  <input
    required
    className="presloginInputField"
    style={inputStyle}
    type={showConfirmPassword ? "text" : "password"}
    value={Confirmpassword}
    onChange={(e) => {setConfirmPassword(e.target.value)
    setError('')}}
    placeholder="Confirm Password"
  />
  
  <FontAwesomeIcon style={{position:'absolute',top:'10px',right:'10px',color:'#40485d'}}
    icon={showConfirmPassword ? faEyeSlash : faEye}
    onClick={handleShowConfirmPassword}
  />
</div>
  </div>
                   
                  </div>
                  {
                    error != '' &&
                  <div style={{color:'red'}}>
                     *{error}
                   </div>
                  }
                  
                  <br />
                  <div className="d-flex justify-content-center align-items-center">
                 
                 
                    <button
                      className=" mb-3"
                      style={signUpButton}
                      type="submit" 
                    >
                      {" "}
                      Sign Up
                    </button>
                    
                  </div>

                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ color: "gray" }}
                  >
                    <small>
                      Already have an account?
                      <Link to="/" style={{ color: "gray" }}>
                        Click Here
                      </Link>
                    </small>
                  </div>
                  <br />
                </form>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      
      <div class="modal-body" style={{textAlign:'center',fontWeight:'bold',padding:'40px',fontSize:'20px'}}>
        SignUp Successful, Please Verify
      </div>
      <div class="modal-footer" style={{border:'none'}} data-bs-dismiss="modal">
        <Link to="/TwoFactorVerification"  style={{...signUpButton,textDecoration:'none',textAlign:'center',width:'100px'}} >Verify</Link>
        {/* <button type="button" class="btn btn-primary">Understood</button> */}
      </div>
    </div>
  </div>
</div>

<div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>

{SuccessPopup && 
<>
<div className="alert alert-success alert-dismissible fade show d-flex justify-content-center align-items-center" style={{height:'200px'}}>

      <div>
   

      <div>
        <strong>Success!</strong> SignUp Successful, Please Verify
        <Link to="/PropertyList" type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>{
          window.location.href="/PropertyList"
        }}></Link>
        
        
    </div>
    <div style={{border:'none'}} >
    <Link to="/TwoFactorVerification"  style={{...signUpButton,textDecoration:'none',textAlign:'center',width:'100px'}} >Verify</Link>
    {/* <button type="button" class="btn btn-primary">Understood</button> */}
  </div>
    </div>
</div>
</>
}
      </div>
    </>
  );
};

export default SignUp;
