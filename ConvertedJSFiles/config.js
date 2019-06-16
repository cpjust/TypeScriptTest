"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = require("log4js");
exports.logger = log4js_1.getLogger();
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'chrome',
        chromeOptions: {
            'w3c': false,
        }
    },
    chromeDriver: '75.0.3770.90',
    framework: 'jasmine',
    specs: ['./specs/**/*.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 90000
    },
    onPrepare: () => {
        //configure('./filename');
        exports.logger.level = 'trace';
        let globals = require('protractor');
        let browser = globals.browser;
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(5000);
        jasmine.getEnv().addReporter({
            specStarted: function (result) {
                console.log('Starting Test Name:' + result.fullName);
            }
        });
        jasmine.getEnv().addReporter({
            specDone: function (result) {
                console.log('Done Test Name:' + result.fullName);
            }
        });
    }
};
