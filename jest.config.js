module.exports = {
  snapshotSerializers: ['enzyme-to-json/serializer', 'pretty-lights/jest'],
  setupFiles: ['raf/polyfill'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  testMatch: ['**/**/*.test.js'],
};
