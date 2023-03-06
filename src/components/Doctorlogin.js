import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
    try {
      const response = await axios.post(
        "http://navatarbe-env.eba-drviydr6.us-east-2.elasticbeanstalk.com/DoctorLogin",
        {
          username: username,
          password: password,
        }
      );
      console.log(response.data);
      if (response.status === 200 && response.data.token) {
        console.log("Login successful"); // Add this line
        // Save the token to the local storage
        localStorage.setItem("token", response.data.token);
        // Redirect to the home page
        navigate("/Home");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      {errorMessage && <div>{errorMessage}</div>}
      <div>
        <h1>Doctor Login</h1>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
    <Link to="/Home">  <button type="submit" disabled={!isValid}>
        Login
      </button>
      </Link>
    </form>
  );
}

export default LoginForm;
