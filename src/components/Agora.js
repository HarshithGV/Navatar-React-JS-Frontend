import React, { useState, useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk';

const App = () => {
  const [client, setClient] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [channel, setChannel] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const initAgora = async () => {
      const agoraAppId = 'c924bd6fb57b44b1809c0746b78875d8';
      const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' });
      client.init(agoraAppId);

      setClient(client);
    };

    initAgora();
  }, []);

  const joinChannel = async () => {
    const token = '007eJxTYLD99K/n5adffx7+Wz+5yq1X8YRpDd/JkD9p+cY7PmXfn7tAgSHZ0sgkKcUsLcnUPMnEJMnQwsAy2cDcxCzJ3MLC3DTFQimdNaUhkJFBV0+GmZEBAkF8dga/xLLEksQiBgYA8JEikA=='; // or generate a token server-side
    const uid = null; // or generate a unique user ID client-side

    const stream = AgoraRTC.createStream({
      streamID: uid,
      audio: true,
      video: true,
      screen: false,
    });

    stream.init(() => {
      client.join(token, channel, uid, () => {
        setIsJoined(true);
        setLocalStream(stream);
      });
    });
  };

  const leaveChannel = () => {
    localStream.close();
    client.leave(() => {
      setIsJoined(false);
    });
  };

  useEffect(() => {
    if (localStream && videoRef.current) {
      videoRef.current.srcObject = localStream.stream;
    }
  }, [localStream]);

  return (
    <div>
      {!isJoined && (
        <>
          <input
            type="text"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            placeholder="Enter meeting code"
          />
          <button onClick={joinChannel}>Join meeting</button>
        </>
      )}

      {isJoined && (
        <>
          <button onClick={leaveChannel}>Leave meeting</button>
          <div>
            <video ref={videoRef} autoPlay />
          </div>
        </>
      )}
    </div>
  );
};

export default App;