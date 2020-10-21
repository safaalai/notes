/* eslint-env node */
process.env.dbUsername = "HDB_ADMIN";
process.env.dbPassword = "password";
process.env.dbUrl = "http://localhost:9925";

module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "testEnvironment":"node",
}
