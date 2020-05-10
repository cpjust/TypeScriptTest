import { logger } from "../config";
import { browser, protractor } from 'protractor';

function printLater(msg: string, time: number): Promise<string> {
    logger.debug("Sleeping for " + time + " ms...");
    return Promise.resolve("")
        .then(() => {
            setTimeout(() => {
                logger.info(msg);
            }, time)
        })
        .then(() => logger.info(msg))
        .then(() => msg);
};

export function nativePromise(msg: string, time: number): Promise<string> {
    return new Promise((resolve, reject) => {
        return printLater(msg, time).then(() => resolve("done"));
    });
};

function protractorPromise(msg: string, time: number) {
    return new protractor.promise.Promise((resolve, reject) => {
        printLater(msg, time).then(() => resolve("done"));
    });
};
