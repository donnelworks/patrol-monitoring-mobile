const { Dimensions } = require("react-native");

const {width, height} = Dimensions.get('window');

const metrics = {
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
};

export default metrics;