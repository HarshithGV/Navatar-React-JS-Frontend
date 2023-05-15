import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { setSelectedTime } from './selectedTime';

function Timeslots(props) {
  const location = useLocation();
  const [bookingDate, setInput1] = useState(new URLSearchParams(location.search).get("bookingDate"));

  const [currentDate, setInput2] = useState(new Date().toISOString().substr(0, 10));
  const [options, setOptions] = useState();
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [times, setTimes] = useState([]);
  const [timer, setTimer] = useState([]);

  useEffect(() => {
    fetch(`https://navatar.sangamone.com/viewTimes?bookingDate=${bookingDate}&currentDate=${currentDate}`)
      .then((response) => response.json())
      .then((Actualdata) => {
        setTimes(Actualdata);
      });
  }, []);

  const handleSelect = (e) => {
    setOptions(e.target.value);
    setIsOptionSelected(true);
    setTimer(e.target.value);
    setSelectedTime(e.target.value);
  };

  return (
    
    <div style={{ textAlign: "center" }}>
     <div  style={{textAlign:"right", marginRight:"1rem"}}>
    <br/>
     <Link to="/"> <button>LOG OUT</button></Link>
      <br/>
    </div>
      <br />
      <form>
        <select value={options} onChange={handleSelect} required>
          <option>Choose Time</option>
          {times.map((opts, i) => (
            <option key={i} value={opts}>
              {opts}:00
            </option>
          ))}
        </select>
      </form>
      <h2>{options}</h2>
      <h3>{timer}</h3>
      
      <Link to={`/Timer`}>
        <button style={{ borderRadius: "0.75rem" }} type="submit" disabled={!isOptionSelected}>
          Submit
        </button>
      </Link>
        
    </div>
  );
}

export default Timeslots;