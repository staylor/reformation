const path = require('path');
const jestPreset = require('jest-preset-kyt-enzyme');
const aliasesConfig = require('../webpack.aliases.config');

const moduleNameMapper = Object.keys(aliasesConfig.resolve.alias).reduce(
  (map, key) => {
    if (key === '__mocks__') {
      return map;
    }

    const value = aliasesConfig.resolve.alias[key];
    if (key.startsWith('^')) {
      map[key] = value;
    } else {
      // use starting char ^ and backreference ($1) everything after key
      map[`^${key}(.*)$`] = `${value}$1`;
    }
    return map;
  },
  // add explicit mocks for imports with webpack syntax
  {
    ...jestPreset.moduleNameMapper,
  }
);

module.exports = {
  displayName: {
    name: 'jest',
    color: 'yellow',
  },
  preset: 'jest-preset-kyt-enzyme',
  moduleNameMapper,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  snapshotSerializers: [...jestPreset.snapshotSerializers, 'pretty-lights/jest'],
  rootDir: path.resolve(__dirname, '..'),
  roots: ['<rootDir>/src/'],
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  coveragePathIgnorePatterns: ['build', 'coverage'],
};
