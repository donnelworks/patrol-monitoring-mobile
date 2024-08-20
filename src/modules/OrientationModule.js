const { NativeModules } = require("react-native");
const module = NativeModules.OrientationModule;

export const landscape = async () => {
    return await module.lockToLandscape();
};

export const portrait = async () => {
    return await module.lockToPortrait();
};

export const landscapeLeft = async () => {
    return await module.lockToLandscapeLeft();
};

export const landscapeRight = async () => {
    return await module.lockToLandscapeRight();
};

export const unlockOrientation = async () => {
    return await module.unlockAllOrientations();
};