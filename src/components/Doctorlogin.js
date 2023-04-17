import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Appnavatar.css";
import { setUserId } from "./Loginstore";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");
    console.log("email: ", email);
    console.log("password: ", password);
    try {
      const response = await axios.post(
        `https://navatar.sangamone.com/DoctorLogin?email=${email}&password=${password}`
      );
      console.log("response: ", response.data);
      if (response.status === 200 && response.data.user_id) {
        setUserId(response.data.user_id);
        console.log(response.data.user_id);
        navigate("/Home");
      } else {
        navigate("/Home");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Navatar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Button variant="outline-primary">Sign Up</Button>
        </Navbar.Collapse>
      </Navbar>

      <div className="my-component">
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          {errorMessage && <div>{errorMessage}</div>}
          <div>
            <h1>Doctor Login</h1>
            <input
              style={{
                padding: "8px 15px",
                border: "2px solid gray",
                borderRadius: "5px",
              }}
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <br />
          <div>
            <input
              style={{
                padding: "8px 15px",
                border: "2px solid gray",
                borderRadius: "5px",
              }}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <br />
          <button type="submit" style={{ borderRadius: "1rem" }}>
            Login
          </button>
        </form>
        <br />
        <div style={{ textAlign: "center" }}>
          <Link to="/OTPgenerator">
            {" "}
            <h6>Forgot password</h6>
          </Link>
          <br />
          {/* <h6>If you don't have any credentials to login <br/><Link to="/Regiteration"> Register here</Link></h6> */}
        </div>
      </div>
    </>
  );
}

export default LoginForm;
