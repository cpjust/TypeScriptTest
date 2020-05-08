import { logger } from "../config";
import { browser, protractor } from 'protractor';

function printLater(msg: string, time: number) {
    logger.debug("Sleeping for " + time + " ms...");
    return browser.sleep(time).then(() => logger.info(msg));
};

export function nativePromise(msg: string, time: number) {
    return new Promise((resolve, reject) => {
        printLater(msg, time).then(() => resolve("done"));
    });
};

function protractorPromise(msg: string, time: number) {
    return new protractor.promise.Promise((resolve, reject) => {
        printLater(msg, time).then(() => resolve("done"));
    });
};
