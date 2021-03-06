import { logger } from "../config";
import { browser, protractor } from 'protractor';

xdescribe("Chris's promise tests: ", function() {
    function sleep(time) {
        return new protractor.promise.Promise((resolve, reject) => {
            logger.trace("Sleeping for: " + time);
            setTimeout(resolve, time);
            logger.trace("Slept for: " + time);
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

    it("cjust - testing promises - 1", (done) => {
        /* Prints the following:
        [TRACE] default - *** test 1
        [TRACE] default - Sleeping for: 100
        [TRACE] default - Slept for: 100
        [DEBUG] default - --1
        [TRACE] default - Sleeping for: 200
        [TRACE] default - Slept for: 200
        [DEBUG] default - --2
        [TRACE] default - Sleeping for: 300
        [TRACE] default - Slept for: 300
        [DEBUG] default - --3
        [TRACE] default - Sleeping for: 400
        [TRACE] default - Slept for: 400
        [DEBUG] default - --4
        */
        logger.trace("*** test 1");

        cjustPromise("--1", 100).then(() => {
            return cjustPromise("--2", 200).then(() => {
                expect(false).toBe(true);
                return cjustPromise("--3", 300).then(() => {
                    return sleep(400).then(() => {
                        logger.debug("--4");
                        done();
                    });
                });
            });
        }).catch(done);
    });

    it("cjust - testing promises - 2", (done) => {
        /* Prints the following:
        [TRACE] default - Sleeping for: 100
        [TRACE] default - Slept for: 100
        [DEBUG] default - --1
        [TRACE] default - Sleeping for: 200
        [TRACE] default - Slept for: 200
        [DEBUG] default - --2
        [TRACE] default - Sleeping for: 300
        [TRACE] default - Slept for: 300
        [DEBUG] default - --3
        [TRACE] default - Sleeping for: 400
        [TRACE] default - Slept for: 400
        [DEBUG] default - --4
        */
        logger.trace("*** test 2");

        cjustPromise("--1", 100).then(() => {
            return cjustPromise("--2", 200);
        }).then(() => {
            expect(false).toBe(true);
            return cjustPromise("--3", 300);
        }).then(() => {
            return sleep(400).then(() => {
                logger.debug("--4");
                done();
            });
        }).catch(done);
    });

    it("cjust - testing promises - 3", (done) => {
        /* Prints the following:
        [TRACE] default - *** test 3
        [TRACE] default - Sleeping for: 100
        [TRACE] default - Slept for: 100
        [DEBUG] default - --1
        [TRACE] default - Sleeping for: 200
        [TRACE] default - Slept for: 200
        [DEBUG] default - --2
        [TRACE] default - Sleeping for: 300
        [TRACE] default - Slept for: 300
        [DEBUG] default - --3
        [TRACE] default - Sleeping for: 400
        [TRACE] default - Slept for: 400
        [DEBUG] default - --4
        */
        logger.trace("*** test 3");

        let flow = browser.controlFlow();

        flow.execute(() => cjustPromise("--1", 100));
        flow.execute(() => cjustPromise("--2", 200));
        expect(false).toBe(true);
        flow.execute(() => cjustPromise("--3", 300));
        flow.execute(() => {
            return sleep(400).then(() => {
                logger.debug("--4");
            });
        });

        done();
    });
});