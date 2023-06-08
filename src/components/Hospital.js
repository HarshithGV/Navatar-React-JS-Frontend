import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Outlet, Link} from "react-router-dom";


function App() {
   
  const [values, setValues] = useState([]);
  const [options, setOptions]= useState();
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const history = useNavigate();
 

  useEffect(() => {
    fetch("https://navatar.sangamone.com/viewCompanies").then((data) => data.json()).then((val) => setValues(val))
  }, [])
  console.log(values,"values")

  const handleSubmit = (e) => {
    e.preventDefault();
    const company_id = options || values[0]; // if options is not selected, use the first date in values array
    history.push({
      pathname: "/Navatar",
      state: { company_id: company_id },
    });
  };
 
  const handleSelect = (e) => {
    setOptions(e.target.value);
    setIsOptionSelected(true);
  };

  return (
    <div className="App">
     <div  style={{textAlign:"right", marginRight:"1rem"}}>
    <br/>
     <Link to="/"> <button>LOG OUT</button></Link>
      <br/>
    </div>
    <h1>Please Select Hospital</h1>
    <form onSubmit={handleSubmit}>
    <select onChange={handleSelect} required>
<option>Choose Hospital</option>
        {
           
            values.map((opts,i)=><option key={i} value={opts.company_id}>{opts.company_name}</option>)
        }
    </select>
    <h1>{options}</h1>
    <Link to={{pathname: "/Navatar", search: `?company_id=${options}`}}>
  <button style={{borderRadius:"0.75rem"}} type="submit" disabled={!isOptionSelected}>
    Submit
  </button>
</Link>
    </form>
      </div>
  );
}

  
export default App;