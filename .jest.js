module.exports = {
  setupFiles: [
    './tests/setup.js',
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  transform: {
    '\\.tsx?$': './node_modules/typescript-babel-jest',
    '\\.js$': './node_modules/babel-jest',
  },
  testRegex: '.*\\.spec\\.js$',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
  ],
  transformIgnorePatterns: [
    '/dist/',
    '/node_modules/'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
};