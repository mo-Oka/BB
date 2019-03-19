//jshint strict: false
exports.config = {

  allScriptsTimeout: 11000,

  specs: [
    '*-spec.js'
  ],

  capabilities: {
    browserName: 'chrome'
  },

  baseUrl: 'http://computer-database.herokuapp.com/computers',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
