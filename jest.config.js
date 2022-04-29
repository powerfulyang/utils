const jestTsconfig = require('tsconfig-paths-jest');
const tsconfig = require('./tsconfig.json');

const moduleNameMapper = jestTsconfig(tsconfig);
module.exports = {
  moduleNameMapper,
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/*.spec.(ts|tsx)'],
  testPathIgnorePatterns: ['./node_modules/', './dist/'],
  testEnvironment: 'jsdom',
  testTimeout: 10000,
};
