import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Outlet, Link} from "react-router-dom";
import "./Appnavatar.css";

function App() {
   
  const [values, setValues] = useState([]);
  const [options, setOptions]= useState();
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const history = useNavigate();
 

  useEffect(() => {
    fetch("https://navatar.sangamone.com/viewCities").then((data) => data.json()).then((val) => setValues(val))
  }, [])
  console.log(values,"values")

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the data using an API call or store it in a state
    // and then navigate to the next page using history.push()
    history.push("/Hospital");
  };
  const handleSelect = (e) => {
    setOptions(e.target.value[0]);
    setIsOptionSelected(true);
  };
  
  return (
    <div className="App">
    <div  style={{textAlign:"right", marginRight:"1rem"}}>
    <br/>
     <Link to="/"> <button>LOG OUT</button></Link>
     <Link to="/Bookeddetails"> <button>Booked Details</button></Link>
      <br/>
    </div>
    <h1>Please Select City </h1>
    <form onSubmit={handleSubmit}>
    <select onChange={handleSelect} required>
    <option>Choose City</option>
    
  
        {
           
            values.map((opts,i)=><option key={i} value={opts.company_id}>{opts.city_name}</option>)
        }
    </select>
    <h1>{options}</h1>
    <Link to="/Hospital"><button style={{borderRadius:"0.75rem"}} type="submit">Submit</button></Link>
    </form>
      </div>
  );
}

  
export default App;