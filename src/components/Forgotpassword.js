import React, { useState } from 'react';

function OtpGenerator() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const [otpGenerated, setOtpGenerated] = useState(false);

  const generateOtp = () => {
    const url = `https://navatar.sangamone.com/generateOtp?email=${email}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setOtp(data.otp);
        setOtpGenerated(true);
      })
      .catch(error => console.error(error));
  };

  const resetPassword = () => {
    const url = `https://navatar.sangamone.com/forgetPassword?email=${email}&otp=${otp}&password=${newPassword}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={generateOtp} disabled={!email}>
        Generate OTP
      </button>
      {otpGenerated && (
        <div>
          <input type="text" value={otp} readOnly />
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <button onClick={resetPassword}>Reset Password</button>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
}

export default OtpGenerator;
