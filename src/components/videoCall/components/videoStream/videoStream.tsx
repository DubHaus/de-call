import Container from 'components/common/container';
import Flex from 'components/common/flex';
import Icon from 'components/common/icon';
import IconButton from 'components/common/iconButton';
import Caption from 'components/common/typography/caption';
import {useEffect, useRef, useState} from 'react';
import {getLocalDevices, getSharingScreensDevices} from 'utils/mediaStream';
import styles from './videoStream.module.scss';

const mediaTypesToIcons = {
    videoinput: 'video',
    audioinput: 'microphone',
    audiooutput: 'audio',
} as const;

const VideoStream = () => {
    const ref = useRef<HTMLVideoElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [muted, setMuted] = useState(false);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const videoDevices = devices.filter(el => el.kind === 'videoinput');
    const audioDevices = devices.filter(el => el.kind !== 'videoinput');
    const [activeAudioDevices, setActiveAudioDevices] =
        useState<MediaStreamTrack[]>([]);
    const [activeVideoDevices, setActiveVideoDevices] =
        useState<MediaStreamTrack[]>([]);

    useEffect(() => {
        getLocalDevices()
            .then(setDevices)
            .catch(err => {
                console.error(`${err.name}: ${err.message}`);
            });
    }, []);
    console.log({activeAudioDevices, audioDevices})

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({video: true, audio: true})
            .then(stream => {
                setActiveAudioDevices(stream.getAudioTracks());
                setActiveVideoDevices(stream.getVideoTracks());
                ref.current && (ref.current.srcObject = stream);
                setIsLoading(false);
                // makeCall(stream, stream => {
                //     remoteVideoRef.current &&
                //         (remoteVideoRef.current.srcObject = stream);
                // });
            })
            .catch(err => console.error(err));
    }, [ref]);

    const startSharingScreen = () => {
        getSharingScreensDevices().then(stream => {});
    };

    return !isLoading ? (
        <Container className={styles.player}>
            <Container className={styles.tools}>
                <Flex gap={15}>
                    <IconButton
                        onClick={() => {}}
                        contextMenu={
                            <Container>
                                {audioDevices.map(el => (
                                    <Container className={styles.device}>
                                        <Flex gap={5}>
                                            <Icon
                                                className={styles.icon}
                                                icon={
                                                    mediaTypesToIcons[el.kind]
                                                }
                                            />
                                            <Caption
                                                bold={
                                                    activeAudioDevices.some(device => device.label ===
                                                    el.label)
                                                }
                                                compact>
                                                {el.label}
                                            </Caption>
                                        </Flex>
                                    </Container>
                                ))}
                            </Container>
                        }
                        icon="microphone"
                    />
                    <IconButton
                        onClick={() => {}}
                        contextMenu={
                            <Container>
                                {videoDevices.map(el => (
                                    <Container className={styles.device}>
                                        <Flex gap={5}>
                                            <Icon
                                                className={styles.icon}
                                                icon={
                                                    mediaTypesToIcons[el.kind]
                                                }
                                            />
                                            <Caption  bold={
                                                    activeVideoDevices.some(device => device.label ===
                                                    el.label)
                                                } compact>
                                                {el.label}
                                            </Caption>
                                        </Flex>
                                    </Container>
                                ))}
                            </Container>
                        }
                        icon="video"
                        type="secondary"
                    />
                    <IconButton
                        onClick={() => {}}
                        icon="cancel-call"
                        type="negative"
                    />
                    <IconButton
                        onClick={startSharingScreen}
                        icon="share-screen"
                    />
                </Flex>
            </Container>
            <video
                className={styles.video}
                autoPlay
                playsInline
                controls={false}
                ref={ref}
                muted
            />
        </Container>
    ) : null;
};

export default VideoStream;
