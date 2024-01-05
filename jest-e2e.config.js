export default {
  testMatch: ["**/*.e2e-spec.*"],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testPathIgnorePatterns: ["./node_modules/", "./dist/"],
  verbose: true,
  testTimeout: 10000,
  testSequencer: "./test/config/testSequencer.cjs"
};
