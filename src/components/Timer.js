import React, {useState, useEffect} from "react";


function Timer({seconds}){
    
   const [timeleft, setTimeLeft] = useState(seconds);

   useEffect(() => {
    const intervalId= setInterval (() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
        if(timeleft == 0) {
            alert("Timer is become 0");
        }

    }, 1000);
    

   return() => clearInterval(intervalId);
}, []);
    return(
        <div>

            <h1>Hello Timer</h1>
            <h2>{timeleft},</h2>
        </div>
    )
}

export default Timer;