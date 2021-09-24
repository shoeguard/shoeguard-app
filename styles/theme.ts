const theme = {
  color: {
    blue: '#2e6eed',
    black: '#000000',
    white: '#ffffff',
    gray: '#b8b8b8',
    red: '#f45151',
    green: '#22d454',
    transparent: 'transparent',
  },
  fontSize: {
    xl: 24,
    lg: 20,
    md: 16,
    sm: 14,
    xs: 12,
    xxs: 8,
  },
  fontFamily: {
    black: 'NotoSansCJKkr-Black',
    bold: 'NotoSansCJKkr-Bold',
    demiLight: 'NotoSansCJKkr-DemiLight',
    light: 'NotoSansCJKkr-Light',
    medium: 'NotoSansCJKkr-Medium',
    regular: 'NotoSansCJKkr-Regular',
    thin: 'NotoSansCJKkr-Thin',
    monoBold: 'NotoSansMonoCJKkr-Bold',
    monoRegular: 'NotoSansMonoCJKkr-Regular',
  },
};

type ThemeType = typeof theme;

export type {ThemeType};
export default theme;
