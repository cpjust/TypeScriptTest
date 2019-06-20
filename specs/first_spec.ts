import { logger } from "../config";
import { browser, protractor } from 'protractor';

describe('Testing promises', function () {

    function printLater(msg: string, time: number) {
        logger.debug("Sleeping for " + time + " ms...");
        return browser.sleep(time).then(() => logger.info(msg));
    }

    function nativePromise(msg: string, time: number) {
        return new Promise((resolve, reject) => {
            printLater(msg, time).then(() => resolve("done"));
        });
    }

    function protractorPromise(msg: string, time: number) {
        return new protractor.promise.Promise((resolve, reject) => {
            printLater(msg, time).then(() => resolve("done"));
        });
    }

    it('promise chain 1', function (done) {
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
            return printLater("--2", 200).then(() => {
                return printLater("--3", 300).thenFinally(() => {
                    logger.info("--done");
                    done();
                });
            });
        });

        logger.trace("End");
    });

    it('promise chain 1.1', function (done) {
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

        nativePromise("--1", 100).then(() => {
            return nativePromise("--2", 200).then(() => {
                return nativePromise("--3", 300).finally(() => {
                    logger.info("--done");
                    done();
                });
            });
        });

        logger.trace("End");
    });

    it('promise chain 1.2', function (done) {
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

        protractorPromise("--1", 100).then(() => {
            protractorPromise("--2", 200).then(() => {
                protractorPromise("--3", 300).thenFinally(() => {
                    logger.info("--done");
                    done();
                });
            });
        });

        logger.trace("End");
    });

    it('promise chain 2', function (done) {
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
            return printLater("--2", 200);
        }).then(() => {
            return printLater("--3", 300);
        }).thenFinally(() => {
            logger.info("--done");
            done();
        });

        logger.trace("End");
    });

    it('promise chain 2.1', function (done) {
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

        nativePromise("--1", 100).then(() => {
            return nativePromise("--2", 200);
        }).then(() => {
            return nativePromise("--3", 300);
        }).finally(() => {
            logger.info("--done");
            done();
        });

        logger.trace("End");
    });

    it('promise chain 2.2', function (done) {
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

        protractorPromise("--1", 100).then(() => {
            return protractorPromise("--2", 200);
        }).then(() => {
            return protractorPromise("--3", 300);
        }).thenFinally(() => {
            logger.info("--done");
            done();
        });

        logger.trace("End");
    });

    it('await promise 3', async function (done) {
        // Works as expected.
        await logger.trace("Start");

        await printLater("--1", 100);
        await printLater("--2", 200);
        await printLater("--3", 300);
        await logger.info("--done");

        await logger.trace("End");
        await done();
    });

    it('await promise 3.1', async function (done) {
        // Works as expected.
        await logger.trace("Start");

        await nativePromise("--1", 100);
        await nativePromise("--2", 200);
        await nativePromise("--3", 300);
        await logger.info("--done");

        await logger.trace("End");
        await done();
    });

    it('await promise 3.2', async function (done) {
        // Works as expected.
        await logger.trace("Start");

        await protractorPromise("--1", 100);
        await protractorPromise("--2", 200);
        await protractorPromise("--3", 300);
        await logger.info("--done");

        await logger.trace("End");
        await done();
    });


});