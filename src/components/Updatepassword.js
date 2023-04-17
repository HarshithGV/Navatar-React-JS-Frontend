import React, { useState } from "react";

function ChangePasswordForm() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`https://navatar.sangamone.com/updatePassword?email=${email}&newPassword=${newPassword}&oldPassword=${oldPassword}`, {
      method: "POST"
    })
    .then(response => {
      if (response.ok) {
        console.log("Password changed successfully")
        setMessage("Password changed successfully");
      } else {
        setMessage("Password change failed");
      }
    })
    .catch(error => {
      setMessage("Password change failed");
    });
  }

  return (
    <div style={{textAlign:"center"}}>
    <h2>Update password</h2><br/>
      <form onSubmit={handleSubmit}>
       
          <input 
           style={{padding: "8px 15px", border: "2px solid gray", borderRadius:"5px"}}
          type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      
        <br />
        <br/>
          <input 
           style={{padding: "8px 15px", border: "2px solid gray", borderRadius:"5px"}}
          type="password" placeholder="Old password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
      
        <br /><br/>
       
          <input
           style={{padding: "8px 15px", border: "2px solid gray", borderRadius:"5px"}}
           type="password" placeholder="New password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
      
        <br /><br/>
        <button style={{ borderRadius: "0.75rem" }}>Update</button>
      </form>
      <h1>{message}</h1>
    </div>
  );
}

export default ChangePasswordForm;
