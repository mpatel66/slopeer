module.exports = {
  env: {
    test: {
      presets: [
        ['preact-cli/babel', { modules: 'esnext' }],
        '@babel/preset-env',
        'babel-preset-preact',
        ['@babel/typescript'],
      ],
      plugins: [['@babel/transform-react-jsx', { pragma: 'h' }]],
    },
  },
};
