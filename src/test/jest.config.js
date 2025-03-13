export default {
    transform: {
      "^.+\\.jsx?$": "babel-jest", // Ensures Jest can process ES6+ syntax
    },
    setupFiles: ["<rootDir>/jest.setup.js"], // Runs before tests to set up global variables
  };
  