import ReactDOM from "react-dom/client";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Doctorlogin from "./components/Doctorlogin";
import Home from "./components/Home";
import Hospital from "./components/Hospital";
import Navatar from "./components/Navatar";
import Timeslots from "./components/Timeslots";
import Payment from "./components/Payment";
import Date from "./components/Date";

import Timervalue from "./components/Timervalue";
import Agora from "./components/Agora";
import BookingList from "./components/BookingList";
import Timer from "./components/Timer";
import VideoRoom from "./components/VideoRoom";
import Updatepassword from "./components/Updatepassword";
import Registeration from "./components/Registeration";
import Profile from "./components/Profile";
import Forgotpassword from "./components/Forgotpassword";
import OTPgenerator from "./components/OTPgenerator";
import OTPverification from "./components/OTPverification";
import Aboutus from "./components/Aboutus";

export default function App() {
  return (


    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Doctorlogin />}/>
      <Route path="/Home" element={<Home />}/>
      <Route path="/hospital" element={<Hospital />}/>
      <Route path="/navatar" element={<Navatar />}/> 
      <Route path="/timeslots" element={<Timeslots />}/> 
      <Route path="/payment" element={<Payment />}/>   
      <Route path="/date" element={<Date />}/>   
      
      <Route path="/timervalue" element={<Timervalue />}/>
      <Route path="/agora" element={<Agora />}/>
      <Route path="/bookinglist" element={<BookingList />}/>
      <Route path="/timer" element={<Timer />}/>
      <Route path="/videoRoom" element={<VideoRoom />}/>
      <Route path="/updatepassword" element={<Updatepassword />}/>
      <Route path="/regiteration" element={<Registeration />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/forgotpassword" element={<Forgotpassword />}/>
      <Route path="/otpgenerator" element={<OTPgenerator />}/>
      <Route path="/otpverification" element={<OTPverification/>}/>
      <Route path="/aboutus" element={<Aboutus/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
