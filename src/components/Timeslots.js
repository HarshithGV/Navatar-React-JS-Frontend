import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

function App() {
  const [bookingDate, setInput1] = useState("");
  const [currentDate, setInput2] = useState("");
  const [options, setOptions]= useState();
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [times, setTimes] = useState([]);
 

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://navatarbe-env.eba-drviydr6.us-east-2.elasticbeanstalk.com/viewTimes?bookingDate=${bookingDate}&currentDate=${currentDate}`)
      .then((response) => response.json())
      .then((Actualdata) => {
        setTimes(Actualdata);
       console.log(Actualdata); 
      console.log(times,"times");
      })
      .catch((error) => console.log(error));
  };
  const handleSelect = (e) => {
    setOptions(e.target.value);
    setIsOptionSelected(true);
  };

  return (
    <div style={{textAlign:"center"}}>
      <form onSubmit={handleSubmit}>
    
         <br></br>
          <input type="text" value={bookingDate} placeholder=" Booking Date" onChange={(event) => setInput1(event.target.value)} required/>
      <br></br>
        <br></br>
          <input type="text" value={currentDate}  placeholder=" Current Date" onChange={(event) => setInput2(event.target.value)} required/>
      <br></br><br></br>
        <button type="submit">Fetch Times</button>
      </form>
   <br></br>
      <form onSubmit={handleSubmit}>
      <select onChange={handleSelect} required>
      <option>Choose Time</option>
        {

          times.map((opts,i)=><option key={i} value={opts}>{opts}</option>)
        
        }
        </select>
      </form>
      <h2>{options}</h2>
      <Link to="/Payment"><button style={{borderRadius:"0.75rem"}} type="submit" disabled={!isOptionSelected}>Submit</button></Link>
      

    </div>
  );
}

export default App;
