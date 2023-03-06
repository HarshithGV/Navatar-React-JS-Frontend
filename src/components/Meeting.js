import { useState, useEffect, useRef } from 'react';
import './Appnavatar.css';
import { VideoRoom } from './VideoRoom';

function App() {
  const [joined, setJoined] = useState(false);
  const [timer, setTimer] = useState(10); // 10 seconds
  const videoRef = useRef(null); // create a ref for the video element

  useEffect(() => {
    let intervalId;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setJoined(true);
    }

    // cleanup function to remove any event listeners or intervals
    return () => {
      clearInterval(intervalId);
      if (videoRef.current) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, [timer]);

  return (
    <div className="App">
      <h1>Navatar Call</h1>

      {!joined && (
        <button disabled={timer > 0} onClick={() => setJoined(true)}>
          {timer > 0 ? `Join Room (${timer})` : 'Join Room'}
        </button>
      )}

      {joined && <VideoRoom videoRef={videoRef} />}
      {/* pass the video ref to the VideoRoom component */}
    </div>
  );
}

export default App;
