import { logger } from "../config";
import { browser, protractor } from 'protractor';

xdescribe("Bad promise tests: ", function() {
    function sleep(time) {
        return new protractor.promise.Promise((resolve, reject) => {
            logger.trace("Sleeping for: " + time);
            setTimeout(resolve, time);
            logger.trace("Slept for: " + time);
        });
    }

    function printLater(msg: string, time: number) {
        logger.debug("Sleeping for " + time + " ms...");
        return browser.sleep(time).then(() => logger.info(msg));
    }

    function nativePromise(msg: string, time: number) {
        return new Promise((resolve, reject) => {
            printLater(msg, time).then(() => resolve("done"));
        });
    }

    function cjustPromise(msg, time) {
        return new protractor.promise.Promise((resolve, reject) => {
            sleep(time).then(() => {
                logger.debug(msg);
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
        logger.trace("Start");

        printLater("--1", 100).then(() => {
            printLater("--2", 100).then(() => {
                printLater("--3", 100);
            });
        }).then(() => {
            logger.trace("End");
        }).thenFinally(() => {
            logger.info("--done");
            done();
        });
    });

});