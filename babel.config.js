module.exports = (api) => {
    api.cache(true);

  return{
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [
          [
              'module-resolver',
              {
                  extensions: ['.ios.js', '.android.js', '.ts', '.tsx', '.json'],
                  alias: {
                      '@': './src'
                  }
              }
          ],
          'react-native-reanimated/plugin',
          ['@babel/plugin-proposal-decorators', { legacy: true }],
      ]
  };
};
