import { logger } from "../config";
import { browser, protractor } from 'protractor';
import { sleep } from "../utils/timing";
import { nativePromise } from "../utils/promises";

describe("Testing promises in loops...", () => {
    const testPromiseChain = "No loops, just promise chaining.";
    it(testPromiseChain, (done) => {
        logger.info(testPromiseChain);
        return nativePromise("First", 3000)
            .then(() => nativePromise("Second", 2000))
            .then(() => nativePromise("Third", 1000))
            .then(() => done())
            .catch(() => done.fail());
    });

    const testArrayReduce = "Promise in Array.reduce().";
    it(testArrayReduce, (done) => {
        logger.info(testArrayReduce);
        let nums = [1, 2, 3];

        return nums.reduce((promise, next) => {
            return promise
                .then(() => nativePromise("Loop #" + next, (nums.length + 1 - next) * 1000));
        }, Promise.resolve())
            .then(() => done())
            .catch(() => done.fail());
    });

    const testForLoopInThen = "Promise in a for loop in a then().";
    it(testForLoopInThen, (done) => {
        logger.info(testForLoopInThen);
        let promise = Promise.resolve("");

        for (let i = 3, j = 1; i > 0; --i, ++j) {
            promise = promise.then(() => nativePromise("Loop #" + j, i * 1000));
        }

        return promise
            .then(() => done())
            .catch(() => done.fail());
    });

    const testForLoop = "Promise in a for loop.";
    it(testForLoop, (done) => {
        logger.info(testForLoop);
        let promise = Promise.resolve("");

        for (let i = 3, j = 1; i > 0; --i, ++j) {
            promise = promise.then(() => nativePromise("Loop #" + j, i * 1000));
        }

        return promise
            .then(() => done())
            .catch(() => done.fail());
    });

});
