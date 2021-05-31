module.exports = {
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  watchPathIgnorePatterns: ['globalConfig'],
  collectCoverageFrom: ['**/src/**/*.js', '!**/src/main/**']
}
