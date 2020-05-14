# Setup
* Install Node v10.x (ex. 10.16.0 LTS)  https://nodejs.org/en/
* Run:  `npm install`
* Run:  `./node_modules/protractor/bin/webdriver-manager update`
* In another terminal run:  `./node_modules/protractor/bin/webdriver-manager start`

# Running the tests:
`npm test`

# Running a specific test:
`npm test --specs=specs/filename.ts`

# Removing converted JS files:
rm -rf ./ConvertedJSFiles/*
