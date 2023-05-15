import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Appnavatar.css";
import { setUserId } from "./Loginstore";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import departments from './img/Navatar-image.jpg';


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
      <Navbar bg="#1977cc" expand="lg">
        <Navbar.Brand href="#home" id="nav-title">Navatar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
         <Link to="Updatepassword"> <Button style={{border:"1px solid #fff", background:"#2c4964", padding: "5px", fontSize: "14px"}}>Sign Up</Button></Link>
        </Navbar.Collapse>
      </Navbar>
      <section id="hero" class="align-items-left">
    <div class="container">
    <div class="row">
    <div class="col">
    <div id="title">
      <h1 style={{fontFamily:"Raleway, sans-serif"}}>Welcome to Navatar</h1>
      <h2>Please Login through the form using your credentials.</h2>
      <a href="#about" class="btn-get-started scrollto">About Us</a>
      </div>
      </div>
      <div class="col">
      <div id="login-form">
            <div className="my-component" id="login"> 
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
            <h3>Forgot password</h3>
          </Link>
          <br />
          {/* <h6>If you don't have any credentials to login <br/><Link to="/Regiteration"> Register here</Link></h6> */}
        </div>
      </div>
      </div>
</div>

      </div>
    </div>
  </section>
  
 


  <section id="about" class="about">
      <div class="container-fluid">
      <h3>About Navatar</h3>
        <div class="row">
          <div class="col-xl-5 col-lg-6 video-box d-flex justify-content-center align-items-stretch position-relative">
          <img src={departments} className="glightbox play-btn mb-4" alt="departments" id="about-img" />

          </div>

          <div class="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
          
            
            <div class="icon-box">
              <div class="icon"><i class="bx bx-fingerprint"></i></div>
              <h4 class="title"><h5>About Navatar</h5></h4>
              <h6 class="description">Navatar is a unique service that brings healthcare professionals closer to their patients, even when they are working from home. Our service offers doctors the opportunity to connect with their patients through our robotic podbot machine, which is equipped with a video monitor for seamless video conferencing.</h6>
            </div>

            <div class="icon-box">
              <div class="icon"><i class="bx bx-gift"></i></div>
              <h4 class="title"><h5>How Navatar Works</h5></h4>
              <h6 class="description">To use our service, doctors simply select their desired city, hospital, Navatar name, date, and time and book the Navatar for a fee of 500.Rs per hour. Once the Navatar is booked, the doctor can control the robot and navigate it to the patient's location. This allows for face-to-face communication, despite the doctor not being physically present.</h6>
            </div>

        

          </div>
        </div>

      </div>
    </section>
    <section id="departments" class="departments">
      <div class="container">

        <div class="section-title">
          <h2>Benefits of Navatar</h2>
          <h6>Navatar offers several benefits, including</h6>
        
        </div>

        <div class="row benefits">
   
         <h4>&#x2713; Increased access to quality healthcare services, especially for patients in remote or underserved areas</h4>
         <h4>&#x2713; Improved work-life balance for doctors, as they can work from home and still connect with their patients</h4>
         <h4>&#x2713; Reduced risk of exposure to contagious diseases, as doctors can communicate with patients remotely</h4>
         <h4>&#x2713; Enhanced patient experience and satisfaction, as they can receive care from their trusted doctor even when they are not physically present.</h4>
                
                    </div>
                    </div>
             
    </section>
      
    <section id="conclusion" class="conclusion">
      <div class="container">

        <div class="section-title">
          <h2>Conclusion</h2>
          
        
        </div>

        <div class="row conclusion">
   
         <h4>At Navatar, we believe that our service will revolutionize the way doctors work and improve patient outcomes. By leveraging the latest technology, we are committed to providing innovative solutions that enhance the delivery of medical services and increase access to quality healthcare for all.</h4>
                    </div>
                    </div>
             
    </section>

    <footer id="footer">


<div class="container d-md-flex py-4">

  <div class="me-md-auto text-center text-md-start">
    <div class="copyright">
      &copy; Copyright <strong><span>Sangam One</span></strong>. All Rights Reserved
    </div>
    <div class="credits">
      
      Designed by <a href="https://bootstrapmade.com/">Privacy and policy</a>
    </div>
  </div>
  
</div>
</footer> 

    </>
  );
}

export default LoginForm;
