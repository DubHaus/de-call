import {useCallback, useEffect, useState} from 'react';
import Peer, {DataConnection, MediaConnection} from 'peerjs';

export const usePeerConnection = (
    localPeerId: string,
    remoteId: string,
    onCall: (call: MediaConnection) => void
) => {
    const [connection, setConnection] = useState<DataConnection | null>(null);
    const [localPeer, setLocalPeer] = useState<Peer | null>(null);

    useEffect(() => {
        localPeer?.on('call', onCall);
        return () => {
            localPeer?.off('call', onCall);
        };
    }, [localPeer, onCall]);

    const setupConnection = useCallback(() => {
        const localPeer = new Peer(localPeerId);
        setLocalPeer(localPeer);

        localPeer.on('open', id => {
            console.log('My peer ID is: ' + id);
            const connection = localPeer.connect(remoteId);
            connection.on('open', () => {
                connection.send(`HI FROM ${localPeerId}`);
                setConnection(connection);
            });
        });

        localPeer.on('connection', connection => {
            connection.on('data', data => {
                console.log(`MESSAGE RECIVED FROM :${remoteId}`, data);
            });
        });
    }, [localPeerId, remoteId]);

    const sendMessage = useCallback(
        (message: string) => {
            connection?.send(message);
        },
        [connection]
    );

    const makeCall = useCallback(
        (stream: MediaStream, onCall: (stream: MediaStream) => void) => {
            const call = localPeer?.call(remoteId, stream);
            call?.on('stream', onCall);
        },
        [localPeer, remoteId]
    );

    return {setupConnection, sendMessage, makeCall};
};
