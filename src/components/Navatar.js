import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Outlet, Link} from "react-router-dom";
import { setSelectedNavatar } from './selectedNavatar';

function App() {
   
  const [values, setValues] = useState([]);
  const [options, setOptions]= useState();
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const history = useNavigate();
 

  useEffect(() => {
    fetch("https://navatar.sangamone.com/viewNavatars").then((data) => data.json()).then((val) => setValues(val))
  }, [])
  console.log(values,"values")

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the data using an API call or store it in a state
    // and then navigate to the next page using history.push()
    history.push("/Date");
  };
  const handleSelect = (e) => {
    setOptions(e.target.value);
    setIsOptionSelected(true);
    setSelectedNavatar(e.target.value);
  };

  return (
    <div className="App">
     <div  style={{textAlign:"right", marginRight:"1rem"}}>
    <br/>
     <Link to="/"> <button>LOG OUT</button></Link>
      <br/>
    </div>
    <h1>Please Select Navatar</h1>
    <form onSubmit={handleSubmit}>
    <select value={options} onChange={handleSelect} required>
    <option>Choose Navatar</option>
        {
           
            values.map((opts,i)=><option key={i} value={opts.navatar_id}>{opts.navatar_name}</option>)
        }
    </select>
    <h1>{options}</h1>
    <Link to="/Date"><button style={{borderRadius:"0.75rem"}} type="submit" disabled={!isOptionSelected}>Submit</button></Link>
      
      </form>
      </div>
  );
}

  
export default App;