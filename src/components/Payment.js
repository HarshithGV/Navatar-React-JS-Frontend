import { useEffect, useState } from "react";
import {Outlet, Link} from "react-router-dom";
function App() {
   
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(`https://navatar.sangamone.com/viewTarrif`)
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setData(actualData);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData(data);
  }, []);

  return (
    <div className="App">
 
    <h1>Payment</h1>
       <h2>Please Pay following charges to book your Navatar.</h2>
     
      {data.map((item, index) => (
        <h2 key={index}>
        
        <h2 value={item.tariff_id=2}>{item.currency} {item.rate_per_slot}</h2>
            <h2></h2>
           
       </h2>
       
      ))}
      <Link to="/Timer"><button style={{borderRadius:"0.75rem"}} type="submit">PAY</button></Link>
      
    
      </div>
  );
}

  
export default App;