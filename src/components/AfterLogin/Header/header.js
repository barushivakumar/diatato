import React, { useState,useEffect } from 'react';
import logoHeader from "../../../assets/headerwhitelogowithname.png";
import axios from "axios";
import profile from "../../../assets/person-fill.svg";
import {Link } from "react-router-dom";

const HeaderStyle ={
    background:'#34447d',
    borderRadius:'12px',
    width:'100%',
    height:'80px',
    padding:'20px'
}
const Header = () => {
    function logout(){
      localStorage.setItem("loggedIn",false)
      localStorage.setItem("role",null)
      setTimeout(() => {
       window.location.href="/"
   }, 500);
      }

      const[UserName,setUserName]=useState('')

      useEffect(() => {
        async function fetchServicesData() {
          const validToken = localStorage.getItem("loginToken");
          if(localStorage.getItem("role") === 'admin'){

            try {
              const response = await axios.get(
                `${process.env.REACT_APP_URL}/admin/users-with-details`,
                {
                  headers: {
                    Authorization: "Bearer " + validToken,
                  },
                }
              );
          
              // await console.log(response.data,"Customers Data");
              for(let p=0;p<response.data.length;p++){
                if(response.data[p].user_id == localStorage.getItem("userID")){
                  setUserName(response.data[p].email)
                }
              }
              
            } catch (error) {
              await console.error(error);
              // window.alert("Can't Assign Same Track Name")
            }
          }
          else if(localStorage.getItem("role") === 'customer'){

            setUserName(`Bhuvi-CId-${localStorage.getItem("userID")}`)
          }
          
        }
        fetchServicesData();
      }, [1]);
  return (
    <>
      <div style={{padding:'20px'}}>
        <div style={HeaderStyle} className='d-flex justify-content-between align-items-center'>
<div>
    {/* <img style={{width:'128px',height:'64px'}} src={logoHeader} /> */}
    <h2 style={{color:"white"}}><b>DIATATO</b></h2>
</div>
<div>
    
      {/* <a href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src={profile} alt=""  className="profile-user rounded-circle"/>
                            </a> */}
                            <div style={{color:'white'}} role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               Student ID {UserName}
                            </div>
                            <div className="dropdown-menu text-center"  style={{
                  background:'white',
              boxShadow: "0 2px 4px rgb(15 34 58 / 12%)",
            }}>
                                <Link
              to="/Profile"
              className=" dropdown-item"
              href="auth-logout.html"
              style={{ color: "black" }}
            >
              Profile{" "}
            </Link>
            
                                
                                { 
                                localStorage.getItem("role") === "customer" &&
<>
                                <div className="dropdown-divider"  style={{ border: "1px solid black" }}></div>
                                <Link
              to="/InvoiceBilling"
              className=" dropdown-item"
              href="auth-logout.html"
              style={{ color: "black" }}
            >
              Invoice and Billing{" "}
            </Link>
            </>
                                }
            
                                
                                
                                <div className="dropdown-divider"  style={{ border: "1px solid black" }}></div>
                                <button to="/" onClick={()=>logout()}  style={{ color: "black" }} className="dropdown-item" href="auth-logout.html">Log out </button>
                            </div>
       
    
</div>
        </div>
      </div>
    </>
  );
};

export default Header;
