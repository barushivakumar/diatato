import React, { useState, useRef, useEffect } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidemenu/Sidebar";
const Activities = () => {
  
    
  return (
   <>
     <Header/>
        <div className="app d-flex " style={{position:'absolute',width:'100%',height:'calc(100vh - 120px)'}}>
          <Sidebar/>
          <div className="componentContainer">
       <div className="ComponentInnerContainer" style={{padding:'20px'}}>
       
        Activities
       </div>
     </div>
        </div>
     
   </>
  );
}


export default Activities;