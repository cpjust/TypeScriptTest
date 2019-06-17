import { ProtractorBrowser, Config, WebDriver } from 'protractor';
import { configure, getLogger } from 'log4js';

export const logger = getLogger();

export let config: Config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'chrome',
        chromeOptions: {
            'w3c': false,
            args: [ "--safe-mode" ]
        }
    },
    chromeDriver: '75.0.3770.90',
    framework: 'jasmine',
    specs: ['./specs/**/*.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 90000
    },
    onPrepare: () => {
        logger.level = 'trace';
        let globals = require('protractor');
        let browser = globals.browser;
//        browser.manage().window().maximize();
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
}

