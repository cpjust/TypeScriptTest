"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const protractor_1 = require("protractor");
function printLater(msg, time) {
    config_1.logger.debug("Sleeping for " + time + " ms...");
    return Promise.resolve("")
        .then(() => protractor_1.browser.sleep(time)
        .catch((err) => Promise.resolve("")))
        // .then(() => {
        //     setTimeout(() => {
        //         logger.info(msg);
        //     }, time)
        // })
        .then(() => config_1.logger.info(msg))
        .then(() => {
        if (time < 0) {
            return Promise.reject("time cannot be < 0!");
        }
        return null;
    })
        .then(() => msg);
}
;
function nativePromise(msg, time) {
    return new Promise((resolve, reject) => {
        return printLater(msg, time).then(() => resolve("done"));
    });
}
exports.nativePromise = nativePromise;
;
function protractorPromise(msg, time) {
    return new protractor_1.protractor.promise.Promise((resolve, reject) => {
        printLater(msg, time).then(() => resolve("done"));
    });
}
;
