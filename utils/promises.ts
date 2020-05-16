import { logger } from "../config";
import { browser, protractor } from 'protractor';
import { rejects } from "assert";

export function printLater(msg: string, time: number): Promise<string> {
    logger.debug("Sleeping for " + time + " ms...");
    return Promise.resolve("")
        .then(() => {
            if (time < 0) {
                return Promise.reject("time cannot be < 0!");
            }
            return null;
        })
        .then(() => browser.sleep(time)
            .catch((err) => Promise.resolve("")))
        .then(() => logger.info(msg))
        .then(() => msg);
};

export function nativePromise(msg: string, time: number): Promise<string> {
    return new Promise((resolve, reject) => {
        return printLater(msg, time)
            .then(() => resolve("done"))
            .catch((err) => reject(err));
    });
};

export function protractorPromise(msg: string, time: number) {
    return new protractor.promise.Promise((resolve, reject) => {
        printLater(msg, time)
            .then(() => resolve("done"))
            .catch((err) => reject(err));
    });
};
