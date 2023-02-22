
import ReactDOM from "react-dom/client";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Hospital from "./components/Hospital";
import Navatar from "./components/Navatar";
import Timeslots from "./components/Timeslots";
import Payment from "./components/Payment";
import Date from "./components/Date";

export default function App() {
  return (


    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path="/hospital" element={<Hospital />}/>
      <Route path="/navatar" element={<Navatar />}/> 
      <Route path="/timeslots" element={<Timeslots />}/> 
      <Route path="/payment" element={<Payment />}/>   
      <Route path="/date" element={<Date />}/>   
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
