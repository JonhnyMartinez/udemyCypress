const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // node events
    },
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    baseUrl: "https://www.salesforce.com",
    experimentalRunAllSpecs: false, // ✅ asegurate de que esto esté en false o no esté
  },
});
