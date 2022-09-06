export const getLocalDevices = () =>
    typeof navigator !== 'undefined'
        ? navigator.mediaDevices.enumerateDevices()
        : null;

export const getSharingScreensDevices = () =>
    typeof navigator !== 'undefined'
        ? navigator.mediaDevices.getDisplayMedia()
        : null;
