/** @type {import('@babel/core').TransformOptions['plugins']}
const plugins = [
 
  "@babel/plugin-proposal-export-namespace-from",
  
  "react-native-reanimated/plugin",
]


module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {},
    },
    plugins,
  };
};
*/

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
