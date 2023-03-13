import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Timeslots from "./Timeslots";

function App() {
  const [values, setValues] = useState([]);
  const [options, setOptions] = useState();
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    fetch("https://navatar.sangamone.com/viewDates")
      .then((data) => data.json())
      .then((val) => setValues(val));
  }, []);
  console.log(values, "values");

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = options || values[0]; // if options is not selected, use the first date in values array
    history.push({
      pathname: "/Timeslots",
      state: { bookingDate: date },
    });
  };

  const handleSelect = (e) => {
    setOptions(e.target.value);
    setIsOptionSelected(true);
  };

  return (
    <div className="App">
      <h1>Please Select Date</h1>
      <form onSubmit={handleSubmit}>
        <select onChange={handleSelect} required>
          <option>Choose Date</option>
          {values.map((opts, i) => (
            <option key={i}>{opts}</option>
          ))}
        </select>
        <h1>{options}</h1>
        
        <Link to={{pathname: "/Timeslots", search: `?bookingDate=${options}`}}>
  <button style={{ borderRadius: "0.75rem" }} type="submit" disabled={!isOptionSelected}>
    Submit
  </button>
</Link>
      </form>
    </div>
  );
}

export default App;
