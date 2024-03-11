module.exports = function(api) {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = [
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-optional-catch-binding',
    '@babel/plugin-transform-nullish-coalescing-operator',
    '@babel/plugin-transform-numeric-separator',
    '@babel/plugin-transform-async-generator-functions',
    '@babel/plugin-transform-optional-chaining',
    '@babel/plugin-transform-object-rest-spread'
  ];

  return {
    presets,
    plugins
  };
};
