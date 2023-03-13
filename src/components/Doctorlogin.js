import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsValid(username && password);
  }, [username, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");
    console.log("username: ", username);
    console.log("password: ", password);
    try {
      const response = await axios.post(
        "https://navatar.sangamone.com/DoctorLogin",
        {
          username: username,
          password: password,
        }
      );
      console.log("response: ", response.data);
      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/Home");
      } else {
        navigate("/Home");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      {errorMessage && <div>{errorMessage}</div>}
      <div>
        <h1>Doctor Login</h1>
 
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          required
        />
      </div>
      <br></br>
      <div>
        
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="password"
          required
        />
      </div>
      <br></br>
     <button to="/Home" type="submit" disabled={!isValid}>
        Login
      </button>
   
    </form>
  );
}

export default LoginForm;
