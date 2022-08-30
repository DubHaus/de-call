export const getLocalDevices = () => navigator.mediaDevices.enumerateDevices();

export const getSharingScreensDevices = () => navigator.mediaDevices.getDisplayMedia();
