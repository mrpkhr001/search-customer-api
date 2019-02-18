// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    verbose: true,
    bail: true,
    testEnvironment: "node",
    testPathIgnorePatterns: [
      "/node_module/"
    ],
    clearMocks: true,
    collectCoverage: false,
    collectCoverageFrom: [
        "backend/src/**/*.{js}",
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
