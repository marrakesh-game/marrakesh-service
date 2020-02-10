module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  transform: {
    '^.+\\.(ts)$': 'ts-jest'
  },
  testMatch: [
    '**/test-integration/**/*.integration-test.ts'
  ],
  testEnvironment: 'node'
}