import {MediaConnection} from 'peerjs';
import {useCallback, useRef, useState} from 'react';
import './App.css';
import {usePeerConnection} from 'hooks';

function App() {
    const ref = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const [localId, setLocalId] = useState('');
    const [remoteId, setRemoteId] = useState('');
    const [message, setMessage] = useState('');

    const onCall = useCallback(
        (call: MediaConnection) => {
            navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
                call.answer(stream); // Answer the call with an A/V stream.
                ref.current && (ref.current.srcObject = stream);
                call.on('stream', remoteStream => {
                    remoteVideoRef.current &&
                        (remoteVideoRef.current.srcObject = remoteStream);
                });
            });
        },
        [remoteVideoRef]
    );

    const {sendMessage, setupConnection, makeCall} = usePeerConnection(
        localId,
        remoteId,
        onCall
    );
    const startCall = () => {
        const constraints = {video: true};
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(stream => {
                ref.current && (ref.current.srcObject = stream);
                makeCall(stream, stream => {
                    remoteVideoRef.current &&
                        (remoteVideoRef.current.srcObject = stream);
                });
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="App">
            <video autoPlay playsInline controls={false} ref={ref} />
            <video autoPlay playsInline controls={false} ref={remoteVideoRef} />
            <br />

            <label>
                <span>Local id</span>
                <input
                    value={localId}
                    onChange={e => setLocalId(e.target.value)}
                />
            </label>
            <label>
                <span>Remote id</span>

                <input
                    value={remoteId}
                    onChange={e => setRemoteId(e.target.value)}
                />
            </label>
            <button onClick={setupConnection}>Setup connection</button>

            <h3>Send message</h3>
            <input
                placeholder="Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <button onClick={() => message && sendMessage(message)}>
                Send message
            </button>
            <button onClick={startCall}>Start call</button>
        </div>
    );
}

export default App;
