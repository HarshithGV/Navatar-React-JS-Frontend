import React from "react";
import Timer from "./Timer";

function App() {
    return(
        <div>
            <h1>Simple Timer</h1>
            <Timer seconds={60}/>
        </div>
    )
}

export default App;