import React, { useState } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidemenu/Sidebar";
import "./usersettings.css"
const UserSettings = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const openDialog = () => {
    console.log("hi")
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccessMessage("");
  };

  const handlePasswordChange = () => {
    setError("");
    setSuccessMessage("");

    // Add your password validation logic here
    if (currentPassword === "") {
      setError("Current password is required.");
      return;
    }

    if (newPassword === "") {
      setError("New password is required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password must match.");
      return;
    }
   
      setSuccessMessage("Password changed successfully!");
      closeDialog();
      setTimeout(() => {
        alert("Password changed successfully!")
      }, 500);
      
  

    

    closeDialog();
  };

  return (
    <>
      <Header />
      <div
        className="app d-flex "
        style={{ position: "absolute", width: "100%", height: "calc(100vh - 120px)" }}
      >
        <Sidebar />
        <div className="componentContainer">
          <div className="ComponentInnerContainer" style={{ padding: "20px" }}>
            <h2>UserSettings</h2>
            <a style={{textDecoration:"underline",marginTop:"50px"}} onClick={openDialog}>Change Password</a>
            
          </div>
        </div>
      </div>

      {showDialog && <>
        <div className="dialog">
          <div className="dialog-content">
            <h2>Change Password</h2>
          
            <div>
              <label>Current Password:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="dialog-buttons">
              <button onClick={handlePasswordChange}>Change Password</button>
              <button onClick={closeDialog}>Cancel</button>
            </div>
          </div>
        </div>
      </>}
    </>
  );
};

export default UserSettings;
