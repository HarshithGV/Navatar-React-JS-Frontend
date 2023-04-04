import AgoraUIKit from "agora-react-uikit";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [videoCall, setVideoCall] = useState(false);
  const [booked_id, setBookedId] = useState('');

  const rtcProps = {
    appId: "c924bd6fb57b44b1809c0746b78875d8",
    channel: "Navatar",
    token:
      "007eJxTYJg8+3xp4PztOZzrmUxXnl999t6Vgnnt57h9nBNnshzSc2JXYEi2NDJJSjFLSzI1TzIxSTK0MLBMNjA3MUsyt7AwN02xuN2mltIQyMgw/c4+JkYGCATx2Rn8EssSSxKLGBgAsmwgmg==",
  };
  
  const callbacks = {
    EndCall: () => {
      if (booked_id) {
        axios
          .put(
            `https://navatar.sangamone.com/updateById?appt_status=Completed&booked_id=${booked_id}`
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      setVideoCall(false);
    },
  };
  
  const handleJoinCall = () => {
    // Make a GET request to fetch the booked_id from the API
    axios.get('https://navatar.sangamone.com/getBookedDetailByUserId?user_id=1')
      .then(response => {
        // Extract the booked_id from the response and set it in the state
        const bookedId = response.data[0].booked_id;
        setBookedId(bookedId);

        // Start the video call
        setVideoCall(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <div style={{ width: "100%", display: "flex", marginTop: "15rem", textAlign: "center" }}>
      <button onClick={handleJoinCall}>Join Navatar Call</button>
    </div>
  );
}

export default App;
