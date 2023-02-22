import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Outlet, Link} from "react-router-dom";


function App() {
   
  const [values, setValues] = useState([]);
  const [options, setOptions]= useState();
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const history = useNavigate();
 

  useEffect(() => {
    fetch("http://navatarbe-env.eba-drviydr6.us-east-2.elasticbeanstalk.com/viewCompanies").then((data) => data.json()).then((val) => setValues(val))
  }, [])
  console.log(values,"values")

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the data using an API call or store it in a state
    // and then navigate to the next page using history.push()
    history.push("/Navatar");
  };
  const handleSelect = (e) => {
    setOptions(e.target.value);
    setIsOptionSelected(true);
  };

  return (
    <div className="App">
    <h1>Please Select Hospital</h1>
    <form onSubmit={handleSubmit}>
    <select onChange={handleSelect} required>
    <option>Choose Hospital</option>
        {
           
            values.map((opts,i)=><option key={i} value={opts.company_id}>{opts.company_name}</option>)
        }
    </select>
    <h1>{options}</h1>
    <Link to="/Navatar"><button style={{borderRadius:"0.75rem"}} type="submit" disabled={!isOptionSelected}>Submit</button></Link>
    </form>
      </div>
  );
}

  
export default App;