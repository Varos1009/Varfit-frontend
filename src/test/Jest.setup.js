// src/setupTests.js
globalThis.import.meta = {
    env: {
      VITE_RAPID_API_KEY: 'mocked-api-key', // Mock the API key here
    },
  };
  