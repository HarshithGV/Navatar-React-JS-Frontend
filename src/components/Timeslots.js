import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
const [bookingDate, setInput1] = useState(new URLSearchParams(location.search).get("bookingDate"));

  const [currentDate, setInput2] = useState(new Date().toISOString().substr(0, 10));
  const [options, setOptions] = useState();
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [times, setTimes] = useState([]);

  useEffect(() => {
  
    fetch(`http://navatarbe-env.eba-drviydr6.us-east-2.elasticbeanstalk.com/viewTimes?bookingDate=${bookingDate}&currentDate=${currentDate}`)
      .then((response) => response.json())
      .then((Actualdata) => {
        setTimes(Actualdata);
        
        console.log(times,"times");
      })},[]);
      

  const handleSelect = (e) => {
    setOptions(e.target.value);
    setIsOptionSelected(true);
  };

  return (
    <div style={{textAlign:"center"}}>
      
   <br></br>
      <form>
      <select onChange={handleSelect} required>
      <option>Choose Time</option>
        {

          times.map((opts,i)=><option key={i} value={opts}>{opts}:00</option>)
        
        }
        </select>
      </form>
      <h2>{options}</h2>
      <Link to="/Payment"><button style={{borderRadius:"0.75rem"}} type="submit" disabled={!isOptionSelected}>Submit</button></Link>
      

    </div>
  );
}

export default App;
