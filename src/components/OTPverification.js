import React, { useState } from 'react';

function VerifyOTP() {
  const [email, setEmail] = useState('');
  const [otpValue, setOTP] = useState('');
  const [result, setResult] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleOTPChange = (event) => {
    setOTP(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    };

    fetch(`https://navatar.sangamone.com/verifyOtp?email=${email}&otpValue=${otpValue}`, requestOptions)
      .then(response => response.json())
      .then(data => setResult(data.message))
      .catch(error => console.error(error));
  }

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          OTP:
          <input type="text" value={otpValue} onChange={handleOTPChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>{result}</p>
    </div>
  );
}

export default VerifyOTP;
