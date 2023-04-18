import React, { useState } from 'react';

function UpdatePassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch('https://navatar.sangamone.com/forgetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to update password.');
      }
    })
    .then(data => {
      console.log(data);
      setSuccess(true);
    })
    .catch(error => console.error(error));
  }

  return (
    <div>
      {success && <p>Password updated successfully!</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}

export default UpdatePassword;
