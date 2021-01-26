// Sync object
module.exports = {
  verbose: true,
  //   window: {
  //     URL: {
  //       createObjectURL: () => {}
  //     },
  // },
};
module.exports = {
  preset: 'jest-preset-preact',
};

// Or async function
module.exports = async () => {
  return {
    verbose: true,
  };
};


module.exports = {
    "jest": {
      "setupFilesAfterEnv": ["<rootDir>src/setupTests.js"]
    }
}
module.exports = {
  transform: { '^.+\\.(ts|tsx|js|jsx)?$': 'ts-jest' },
  transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/tests/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'css'],
};
