// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

    roots: ["./src"],
    verbose: true,
    bail: true,
    globalSetup: "<rootDir>/jestConfig/setup.js",
    globalTeardown: "<rootDir>/jestConfig/teardown.js",
    testEnvironment: "<rootDir>/jestConfig/mongo-environment.js",

    testPathIgnorePatterns: [
      "/node_module/"
    ],
    clearMocks: true,
    collectCoverage: false,
    collectCoverageFrom: [
        "./src/**/*.js",
        "!**/node_modules/**",
        "!**/build/**"
    ],

    coverageDirectory: "../build/coverage",

    coverageReporters: [
        "json",
        "text",
        "html",
        "text-summary"
    ],
    coverageThreshold: {
        "global": {
            "branches": 70,
            "function": 80,
            "lines": 80,
            "statements": 80
        }
    },
    reporters: [
        "default",
        [
            "jest-html-reporter",
            {
                "pageTitle": "Test Report",
                "outputPath": "./build/test/customer-search.html",
                "includeFailureMsg": true,
                "includeConsoleLog": true,
                "sort": "titleAsc"
            }
        ]
    ],
};
