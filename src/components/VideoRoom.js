import AgoraUIKit from "agora-react-uikit";
import React, {useState} from "react";


function App () {
const [videoCall, setVideoCall] = useState(false);

const rtcProps = {
    appId: "c924bd6fb57b44b1809c0746b78875d8",
    channel: "Navatar",
    token: "007eJxTYLD1iciUcp7grDhJ1/KYe2j1YzaR0K0mq5XDj1i6TL7a7KDAkGxpZJKUYpaWZGqeZGKSZGhhYJlsYG5ilmRuYWFummKx2002pSGQkSFJ5QgzIwMEgvjsDH6JZYkliUUMDABfIxw9",
};
const callbacks = {
  EndCall: () => setVideoCall(false),
};
return videoCall ? (
  <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
    <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
  </div>
) : (
<div style={{ width: "100%", display: "flex", marginTop:"15rem", textAlign:"center"}}>
  <button onClick={() => setVideoCall(true)}>Join Navatar Call</button></div>
);
}

export default App;
