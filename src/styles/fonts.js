import { StatusBar } from "react-native";
import metrics from "./metrics"

const size =  {
    value: (size, standardScreenHeight = 680) => {
        const standardLength = metrics.screenWidth > metrics.screenHeight ? metrics.screenWidth : metrics.screenHeight;
        const offset = metrics.screenWidth > metrics.screenHeight ? 0 : StatusBar.currentHeight;
        const deviceHeight = standardLength - offset;
        const sizeValue = (size * deviceHeight) / standardScreenHeight;
        return Math.round(sizeValue);
    },
    precent: (percent) => {
        const standardLength = metrics.screenWidth > metrics.screenHeight ? metrics.screenWidth : metrics.screenHeight;
        const offset = metrics.screenWidth > metrics.screenHeight ? 0 : StatusBar.currentHeight;
        const deviceHeight = standardLength - offset;
        const sizePrecent = (percent * deviceHeight) / 100;
        return Math.round(sizePrecent);
    }
};

const type = {
    OpenSansLight: 'OpenSans-Light',
    OpenSansLightItalic: 'OpenSans-LightItalic',
    OpenSansRegular: 'OpenSans-Regular',
    OpenSansRegularItalic: 'OpenSans-Italic',
    OpenSansSemiBold: 'OpenSans-SemiBold',
    OpenSansSemiBoldItalic: 'OpenSans-SemiBoldItalic',
    OpenSansBold: 'OpenSans-Bold',
    OpenSansBoldItalic: 'OpenSans-BoldItalic',
    OpenSansExtraBold: 'OpenSans-ExtraBold',
    OpenSansExtraBoldItalic: 'OpenSans-ExtraBoldItalic',
    SportsNight: 'SFSportsNight',
};

export {size, type};