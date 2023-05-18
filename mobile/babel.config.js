module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // 'inline-dotenv',
      // ['module:react-native-dotenv'],
      'nativewind/babel',
      require.resolve('expo-router/babel'),
    ],
  }
}
