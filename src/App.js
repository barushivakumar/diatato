import {React,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TwoFactorVerification from './components/BeforeLogin/twoFactorVerification';
import { connect } from 'react-redux';

import Login from './components/BeforeLogin/login';
import SignUp from './components/BeforeLogin/signUp';
import SuccessSignup from './components/BeforeLogin/successSignUp';
import ForgotPassword from './components/BeforeLogin/forgotPassword';
import ForgotPasswordOTP from './components/BeforeLogin/forgotPasswordOTP';
import EditPassword from './components/BeforeLogin/editPassword';
import './App.css';

// STUDENT
import Dashboard from './components/AfterLogin/Student/Dashboard/dashboard';
import Activities from './components/AfterLogin/Student/Activities/activities';
import Appointments from './components/AfterLogin/Student/Appointments/appointments';
import Reports from './components/AfterLogin/Student/Report/report';
import UpcomingEvents from './components/AfterLogin/Student/UPcomingEvents/ucomingEvents';
import UserSettings from './components/AfterLogin/Student/UserSettings/userSettings';





function App() {
 
  useEffect(()=>{
 
    console.log(localStorage.getItem("loggedIn"),localStorage.getItem('role'))
    
  })
// const roles =  localStorage.getItem("role")
  return (
   
            

             
<div className="app">

          {
            (localStorage.getItem('loggedIn') === "false" || localStorage.getItem('role') === null)  && 
            <>

<Routes>
<Route exact path='/' element={<Login />} />
<Route path='/signup' element={<SignUp />} />
<Route path='/SuccessSignup' element={<SuccessSignup />} />
<Route path='/ForgotPassword' element={<ForgotPassword />} />
<Route path='/ForgotPasswordOTP' element={<ForgotPasswordOTP />} />
<Route path='/EditPassword' element={<EditPassword />} />
<Route path='/TwoFactorVerification' element={<TwoFactorVerification />} />
<Route path='/dashboard' element={<Navigate to="/" />} />
<Route path='/PortalAdministration' element={<Navigate to="/" />} />


</Routes>
</>
          
          }         



{
           localStorage.getItem("loggedIn") == 'true'  && 

            <>
           {
            (localStorage.getItem('role') === 'student') && 
            <>
            <Routes>
              <Route exact path='/'  element={<Navigate to="/Dashboard" />} />
              
              <Route path='/Dashboard' element={<Dashboard />} />
              <Route path='/Activities' element={<Activities />} />
              <Route path='/Appointments' element={<Appointments />} />
              <Route path='/Reports' element={<Reports />} />
              <Route path='/UpcomingEvents' element={<UpcomingEvents />} />
              <Route path='/UserSettings' element={<UserSettings />} />
              </Routes> 
            </>
           }


           {/* {
            (localStorage.getItem('role') === 'admin') &&
            <>
            <Routes>
            <Route exact path='/'  element={<Navigate to="/dashboard" />} />
            <Route path='/Profile' element={<AdminProfile />} />
            <Route path='/EditAdminProfile' element={<EditAdminProfile />} />
            
              <Route path='/dashboard' element={<Dashboard />} />

              <Route path='/PortalAdministration' element={<PortalAdministration />} />
              <Route path='/UserRole' element={<UserRole />} />

              <Route path='/PropertyManagement' element={<PropertyManagement />} />
              <Route path='/AdminSingleProperty' element={<AdminSingleProperty />} />
              <Route path='/AdminEditProperty' element={<AdminEditProperty />} />
              <Route path='/AdminAddProperty' element={<AdminAddProperty />} />
              <Route path='/PropertyList' element={<PropertyList />} />
              <Route path='/ServiceList' element={<ServiceList />} />

              <Route path='/SubscriptionManagement' element={<SubscriptionManagement />} />
              <Route path='/SubscriptionList' element={<SubscriptionList />} />
              <Route path='/BillingList' element={<BillingList />} />
              <Route path='/TaskManagement' element={<TaskManagement />} />
              
              </Routes>
            </>

           } */}
             
            </>  
          }
       
         
        
        </div>
          
 
      
        
        
            
       
        
    

   
  );
}


const mapStateToProps = (state) => ({
  role: state.role
});

export default connect(mapStateToProps)(App);
