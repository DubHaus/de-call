import Container from 'components/common/container';
import Flex from 'components/common/flex';
import Icon from 'components/common/icon';
import IconButton from 'components/common/iconButton';
import Caption from 'components/common/typography/caption';
import {Component, createRef, useEffect, useRef, useState} from 'react';
import {getLocalDevices, getSharingScreensDevices} from 'utils/mediaStream';
import styles from './videoStream.module.scss';

const mediaTypesToIcons = {
    videoinput: 'video',
    audioinput: 'microphone',
    audiooutput: 'audio',
} as const;

type State = {
    videoActive: boolean;
    audioActive: boolean;
    audioDevices: MediaDeviceInfo[];
    videoDevices: MediaDeviceInfo[];
    activeAudioInput: string;
    activeVideoInput: string;
};

class VideoStream extends Component<{}, State> {
    private videoRef: React.RefObject<HTMLVideoElement>;
    private constrains: MediaStreamConstraints;
    private audioTrack: MediaStreamTrack | null;
    private videoTrack: MediaStreamTrack | null;
    private stream: MediaStream | null;

    constructor(props: {}) {
        super(props);

        this.state = {
            audioActive: false,
            videoActive: false,
            audioDevices: [],
            videoDevices: [],
            activeAudioInput: '',
            activeVideoInput: '',
        };
        this.videoRef = createRef<HTMLVideoElement>();
        this.constrains = {
            video: {
                width: 1920,
                height: 1080,
            },
            audio: {
                sampleSize: 16,
                channelCount: 2,
            },
        };
        this.audioTrack = null;
        this.videoTrack = null;
        this.stream = null;
        this.startStream = this.startStream.bind(this);
        this.updateDeviceList = this.updateDeviceList.bind(this);
        this.toggleVideo = this.toggleVideo.bind(this);
        this.toggleAudio = this.toggleAudio.bind(this);
        this.startSharingScreen = this.startSharingScreen.bind(this);
        this.changeAudioInput = this.changeAudioInput.bind(this);
        this.changeVideoInput = this.changeVideoInput.bind(this);
        this.switchDevice = this.switchDevice.bind(this);
        this.stopStream = this.stopStream.bind(this);
    }

    componentDidMount() {
        this.startStream();
        this.updateDeviceList();

        navigator.mediaDevices.ondevicechange = event => {
            this.updateDeviceList();
        };
    }

    switchDevice(
        type: 'audioinput' | 'audiooutput' | 'videoinput',
        deviceId: string
    ) {
        switch (type) {
            case 'audioinput':
                navigator.mediaDevices
                    .getUserMedia({audio: {deviceId}})
                    .then(stream => {
                        this.stream?.removeTrack(
                            this.stream.getAudioTracks()[0]
                        );
                        this.audioTrack = stream.getAudioTracks()[0];
                        this.stream?.addTrack(this.audioTrack);
                    });
        }
    }

    startStream() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => {
                track.stop();
            });
        }
        navigator.mediaDevices
            .getUserMedia(this.constrains)
            .then(stream => {
                this.stream = stream;

                this.audioTrack = stream.getAudioTracks()[0];
                this.videoTrack = stream.getVideoTracks()[0];

                this.setState({
                    audioActive: this.audioTrack.enabled,
                    videoActive: this.videoTrack.enabled,
                });

                this.stream.addEventListener('addtrack', e => {
                    debugger;
                    switch (e.track.kind) {
                        case 'videoinput':
                            this.setState(state => ({
                                ...state,
                                activeVideoInput:
                                    e.track.getSettings().deviceId || '',
                            }));
                            break;
                        case 'audioinput':
                            this.setState(state => ({
                                ...state,
                                activeAudioInput:
                                    e.track.getSettings().deviceId || '',
                            }));
                    }
                });

                this.stream.onremovetrack = e => {
                    debugger;
                };

                this.videoRef.current &&
                    (this.videoRef.current.srcObject = stream);

                // makeCall(stream, stream => {
                //     remoteVideoRef.current &&
                //         (remoteVideoRef.current.srcObject = stream);
                // });
            })
            .catch(console.error);
    }

    stopStream() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => {
                track.stop();
            });
        }
    }

    toggleAudio() {
        if (this.audioTrack) {
            this.audioTrack.enabled = !this.state.audioActive;
        }
        this.setState(state => ({
            ...state,
            audioActive: !this.state.audioActive,
        }));
    }

    toggleVideo() {
        if (this.videoTrack) {
            this.videoTrack.enabled = !this.state.videoActive;
        }
        this.setState(state => ({
            ...state,
            videoActive: !this.state.videoActive,
        }));
    }

    changeAudioInput(value: string) {
        this.switchDevice('audioinput', value);
        // this.setState(state => ({...state, activeAudioInput: value}));
    }

    changeVideoInput(value: string) {
        this.setState(state => ({...state, activeVideoInput: value}));
    }

    updateDeviceList() {
        getLocalDevices()
            .then(devices => {
                const videoDevices = devices.filter(
                    el => el.kind === 'videoinput'
                );
                const audioDevices = devices.filter(
                    el => el.kind !== 'videoinput'
                );
                this.setState(state => ({
                    ...state,
                    audioDevices,
                    videoDevices,
                }));
            })
            .catch(console.error);
    }

    startSharingScreen() {
        getSharingScreensDevices().then(stream => {});
    }

    render() {
        const currentVideoDeviceId = this.videoTrack?.getSettings().deviceId;
        const currentMicro = this.audioTrack?.getSettings().deviceId;

        const audioMuted = !this.audioTrack?.enabled;
        const videoMuted = !this.videoTrack?.enabled;

        return (
            <Container className={styles.player}>
                <Container className={styles.tools}>
                    <Flex gap={15}>
                        <IconButton
                            onClick={this.toggleAudio}
                            contextMenu={
                                <Container>
                                    {this.state.audioDevices.map(el => (
                                        <Container
                                            onClick={() =>
                                                this.changeAudioInput(
                                                    el.deviceId
                                                )
                                            }
                                            className={styles.device}>
                                            <Flex gap={5}>
                                                <Icon
                                                    className={styles.icon}
                                                    icon={
                                                        mediaTypesToIcons[
                                                            el.kind
                                                        ]
                                                    }
                                                />
                                                <Caption
                                                    bold={
                                                        currentMicro ===
                                                        el.deviceId
                                                    }
                                                    compact>
                                                    {el.label}
                                                </Caption>
                                            </Flex>
                                        </Container>
                                    ))}
                                </Container>
                            }
                            icon={
                                audioMuted ? 'microphone-muted' : 'microphone'
                            }
                            type={audioMuted ? 'alt' : 'primary'}
                        />
                        <IconButton
                            onClick={this.toggleVideo}
                            contextMenu={
                                <Container>
                                    {this.state.videoDevices.map(el => (
                                        <Container
                                            onClick={() =>
                                                this.changeVideoInput(
                                                    el.deviceId
                                                )
                                            }
                                            className={styles.device}>
                                            <Flex gap={5}>
                                                <Icon
                                                    className={styles.icon}
                                                    icon={
                                                        mediaTypesToIcons[
                                                            el.kind
                                                        ]
                                                    }
                                                />
                                                <Caption
                                                    bold={
                                                        currentVideoDeviceId ===
                                                        el.deviceId
                                                    }
                                                    compact>
                                                    {el.label}
                                                </Caption>
                                            </Flex>
                                        </Container>
                                    ))}
                                </Container>
                            }
                            icon={videoMuted ? 'video-off' : 'video'}
                            type={videoMuted ? 'alt' : 'secondary'}
                        />
                        <IconButton
                            onClick={this.stopStream}
                            icon="cancel-call"
                            type="negative"
                        />
                        <IconButton
                            onClick={this.startSharingScreen}
                            icon="share-screen"
                        />
                    </Flex>
                </Container>
                <video
                    className={styles.video}
                    autoPlay
                    playsInline
                    controls={false}
                    ref={this.videoRef}
                />
            </Container>
        );
    }
}

export default VideoStream;
