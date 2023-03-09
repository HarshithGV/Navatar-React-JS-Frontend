import React, { useState, useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk';

const App = () => {
  const [client, setClient] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [channel, setChannel] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [isHost, setIsHost] = useState(false);
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
    const token = '007eJxTYAg+tcVrj9/L1gvZfKzt0zmjn0huevIjuWXNjpZMyb699ooKDMmWRiZJKWZpSabmSSYmSYYWBpbJBuYmZknmFhbmpikWVmWcKQ2BjAx/qhKYGRkgEMRnZ/BLLEssSSxiYAAAs7YgEg=='; // or generate a token server-side
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

  const onRoleChange = (event) => {
    setIsHost(event.target.value === 'host');
  };

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
          <br />
          <label>
            <input type="radio" name="role" value="audience" onChange={onRoleChange} checked={!isHost} />
            Audience
          </label>
          <label>
            <input type="radio" name="role" value="host" onChange={onRoleChange} checked={isHost} />
            Host
          </label>
          <br />
          <button onClick={joinChannel}>Join meeting</button>
        </>
      )}

      {isJoined && (
        <>
          <button onClick={leaveChannel}>Leave meeting</button>
          <div>
            {isHost && <div>You are the host.</div>}
            <video ref={videoRef} autoPlay />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
