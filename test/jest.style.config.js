const path = require('path');

module.exports = {
  displayName: {
    name: 'stylelint',
    color: 'yellow',
  },
  preset: 'jest-preset-kyt-styled',
  rootDir: path.resolve(__dirname, '..'),
  testMatch: ['<rootDir>/src/**/*.js'],
  testPathIgnorePatterns: ['__tests__', '__fixtures__'],
};
