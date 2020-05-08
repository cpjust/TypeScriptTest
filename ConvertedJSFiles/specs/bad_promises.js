"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const protractor_1 = require("protractor");
xdescribe("Bad promise tests: ", function () {
    function sleep(time) {
        return new protractor_1.protractor.promise.Promise((resolve, reject) => {
            config_1.logger.trace("Sleeping for: " + time);
            setTimeout(resolve, time);
            config_1.logger.trace("Slept for: " + time);
        });
    }
    function printLater(msg, time) {
        config_1.logger.debug("Sleeping for " + time + " ms...");
        return protractor_1.browser.sleep(time).then(() => config_1.logger.info(msg));
    }
    function nativePromise(msg, time) {
        return new Promise((resolve, reject) => {
            printLater(msg, time).then(() => resolve("done"));
        });
    }
    function cjustPromise(msg, time) {
        return new protractor_1.protractor.promise.Promise((resolve, reject) => {
            sleep(time).then(() => {
                config_1.logger.debug(msg);
                resolve("Worked.");
            }).catch((e) => {
                reject(Error(e));
            });
        });
    }
    it('promise chain 1', function (done) {
        /* Prints the following:
        [TRACE] default - Start
        [DEBUG] default - Sleeping for 100 ms...
        [INFO] default - --1
        [DEBUG] default - Sleeping for 100 ms...
        [INFO] default - --2
        [DEBUG] default - Sleeping for 100 ms...
        [INFO] default - --3
        [TRACE] default - End
        [INFO] default - --done
        */
        config_1.logger.trace("Start");
        printLater("--1", 100).then(() => {
            printLater("--2", 100).then(() => {
                printLater("--3", 100);
            });
        }).then(() => {
            config_1.logger.trace("End");
        }).thenFinally(() => {
            config_1.logger.info("--done");
            done();
        });
    });
});
