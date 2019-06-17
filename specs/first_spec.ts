import { logger } from "../config";
import { Locator } from 'protractor/built/locators';
import { ElementFinder, browser, by, element, protractor } from 'protractor';

describe('Testing promises', function () {

    function printLater(msg: string, time: number) {
        logger.debug("Sleeping for " + time + " ms...");
        return browser.sleep(time).then(() => logger.info(msg));
    }

    function nativePromise(msg: string, time: number) {
        return new Promise(() => {
            printLater(msg, time);
        });
    }

    function protractorPromise(msg: string, time: number) {
        return new protractor.promise.Promise(() => {
            printLater(msg, time);
        });
    }

    it('promise chain 1', function () {
        /* Prints the following:
        [TRACE] default - Start
        [DEBUG] default - Sleeping for 100 ms...
        [TRACE] default - End
        [INFO] default - --1
        [DEBUG] default - Sleeping for 200 ms...
        [INFO] default - --2
        [DEBUG] default - Sleeping for 300 ms...
        [INFO] default - --3
        [INFO] default - --done
        */
        logger.trace("Start");

        printLater("--1", 100).then(() => {
            printLater("--2", 200).then(() => {
                printLater("--3", 300).thenFinally(() => {
                    logger.info("--done");
                });
            });
        });

        logger.trace("End");
    });

    it('promise chain 1.1', function () {
        /* Prints the following:
        [TRACE] default - Start
        [DEBUG] default - Sleeping for 100 ms...
        [TRACE] default - End
        [INFO] default - --1
        */
        logger.trace("Start");

        nativePromise("--1", 100).then(() => {
            nativePromise("--2", 200).then(() => {
                nativePromise("--3", 300).finally(() => {
                    logger.info("--done");
                });
            });
        });

        logger.trace("End");
    });

    it('promise chain 1.2', function () {
        /* Prints the following:
        [TRACE] default - Start
        [DEBUG] default - Sleeping for 100 ms...
        [TRACE] default - End
        [INFO] default - --1
        */
        logger.trace("Start");

        protractorPromise("--1", 100).then(() => {
            protractorPromise("--2", 200).then(() => {
                protractorPromise("--3", 300).thenFinally(() => {
                    logger.info("--done");
                });
            });
        });

        logger.trace("End");
    });

    it('promise chain 2', function () {
        /* Prints the following:
        [TRACE] default - Start
        [DEBUG] default - Sleeping for 100 ms...
        [TRACE] default - End
        [INFO] default - --1
        [DEBUG] default - Sleeping for 200 ms...
        [INFO] default - --2
        [DEBUG] default - Sleeping for 300 ms...
        [INFO] default - --3
        [INFO] default - --done
        */
        logger.trace("Start");

        printLater("--1", 100).then(() => {
            printLater("--2", 200);
        }).then(() => {
            printLater("--3", 300);
        }).thenFinally(() => {
            logger.info("--done");
        });

        logger.trace("End");
    });

    it('promise chain 2.1', function () {
        /* Prints the following:
        [TRACE] default - Start
        [DEBUG] default - Sleeping for 100 ms...
        [TRACE] default - End
        [INFO] default - --1
        */
        logger.trace("Start");

        nativePromise("--1", 100).then(() => {
            nativePromise("--2", 200);
        }).then(() => {
            nativePromise("--3", 300);
        }).finally(() => {
            logger.info("--done");
        });

        logger.trace("End");
    });

    it('promise chain 2.2', function () {
        /* Prints the following:
        [TRACE] default - Start
        [DEBUG] default - Sleeping for 100 ms...
        [TRACE] default - End
        [INFO] default - --1
        */
        logger.trace("Start");

        protractorPromise("--1", 100).then(() => {
            protractorPromise("--2", 200);
        }).then(() => {
            protractorPromise("--3", 300);
        }).thenFinally(() => {
            logger.info("--done");
        });

        logger.trace("End");
    });

    it('await promise 3', async function () {
        // Works as expected.
        await logger.trace("Start");

        await printLater("--1", 100);
        await printLater("--2", 200);
        await printLater("--3", 300);
        await logger.info("--done");

        await logger.trace("End");
    });

    it('await promise 3.1', async function () {
        /* Prints the following:
        [TRACE] default - Start
        [DEBUG] default - Sleeping for 100 ms...
        [INFO] default - --1
        */
        await logger.trace("Start");

        await nativePromise("--1", 100);
        await nativePromise("--2", 200);   // Gets stuck after "--1"
        await nativePromise("--3", 300);
        await logger.info("--done");

        await logger.trace("End");
    });

    it('await promise 3.2', async function () {
        /* Prints the following:
        [TRACE] default - Start
        [DEBUG] default - Sleeping for 100 ms...
        [INFO] default - --1
        */
       await logger.trace("Start");

        await protractorPromise("--1", 100);
        await protractorPromise("--2", 200);   // Gets stuck after "--1"
        await protractorPromise("--3", 300);
        await logger.info("--done");

        await logger.trace("End");
    });


});