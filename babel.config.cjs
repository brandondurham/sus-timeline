module.exports = {
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
        meaninglessFileNames: ['index', 'index.styled'],
      },
    ],
  ],
  presets: [
    [
      'babel-preset-gatsby',
      {
        targets: {
          chrome: 100,
          firefox: 91,
          safari: 15,
        },
      },
    ],
  ],
};
