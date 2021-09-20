import {Dimensions, PixelRatio} from 'react-native';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
const standardLength = width > height ? width : height;

// font percent
export const fp = (percent: number) => {
  const heightPercent = (percent * standardLength) / 100;
  return Math.round(heightPercent);
};

// font size
export const fs = (fontSize: number, standardScreenHeight = 680) => {
  const heightPercent = (fontSize * standardLength) / standardScreenHeight;
  return Math.round(heightPercent);
};

// width percent
export const wp = (percent: number | string) => {
  const elemWidth = typeof percent === 'number' ? percent : parseFloat(percent);
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

// height percent
export const hp = (percent: number | string) => {
  const elemHeight =
    typeof percent === 'number' ? percent : parseFloat(percent);

  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};
