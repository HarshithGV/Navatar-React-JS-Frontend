import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function OtpGenerator() {
  const [email, setEmail] = useState('harshithgv.sangamone@gmail.com');
  const [otp, setOtp] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const generateOtp = () => {
    const url = `https://navatar.sangamone.com/generateOtp?email=${email}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => setOtp(data.otp))
    .catch(error => console.error(error));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(e.target.checkValidity());
  }

  return (
    <div>
      <input type="email" value={email} onChange={handleEmailChange} required />
      <Link to="/OTPverification"> <button onClick={generateOtp} disabled={!isEmailValid}>Generate OTP</button></Link>
      {otp && <p>Your OTP is: {otp}</p>}
    </div>
  );
}

export default OtpGenerator;
