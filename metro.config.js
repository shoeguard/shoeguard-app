const path = require('path');
const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      extraNodeModules: {
        utils: path.resolve(__dirname, 'utils'),
        screens: path.resolve(__dirname, 'screens'),
        components: path.resolve(__dirname, 'components'),
        api: path.resolve(__dirname, 'api'),
        hooks: path.resolve(__dirname, 'hooks'),
        styles: path.resolve(__dirname, 'styles'),
        images: path.resolve(__dirname, 'assets/images'),
      },
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
