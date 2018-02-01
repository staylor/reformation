module.exports = {
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/build/'],
  testMatch: ['**/**/*.test.js'],
};
