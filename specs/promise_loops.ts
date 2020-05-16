import { logger } from "../config";
import { printLater, nativePromise, protractorPromise } from "../utils/promises";

const using = require('jasmine-data-provider');

const TIMEOUT = 10000;

const functions = [
        {
            name: 'printLater',
            ptr: printLater
        },
        {
            name: 'nativePromise',
            ptr: nativePromise
        },
        {
            name: 'protractorPromise',
            ptr: protractorPromise
        },
];

describe("Testing promises in loops...", () => {
    using(functions, (data) => {
        const func = data.ptr;
        const funcName = data.name;

        const testPromiseChain = `[${funcName}] - No loops, just promise chaining.`;
        it(testPromiseChain, (done) => {
            logger.info(testPromiseChain);
            return func("First", 2000)
                .then(() => func("Boom!", -1))
                .then(() => func("Second", 1000))
                .then(() => done())
                .catch(() => done.fail());
        }, TIMEOUT);

        const testArrayReduce = `[${funcName}] - Promise in Array.reduce().`;
        it(testArrayReduce, (done) => {
            logger.info(testArrayReduce);
            let nums = [1, 2];

            return nums.reduce((promise, next) => {
                return promise
                    .then(() => func("Loop #" + next, (nums.length + 1 - next) * 1000))
                    .then(() => func("Boom!", -1));
            }, Promise.resolve())
                .then(() => done())
                .catch(() => done.fail());
        }, TIMEOUT);

        const testForLoopInThen = `[${funcName}] - Promise in a for loop in a then().`;
        it(testForLoopInThen, (done) => {
            logger.info(testForLoopInThen);
            let promise = Promise.resolve("");

            for (let i = 2, j = 1; i > 0; --i, ++j) {
                promise = promise
                    .then(() => func("Loop #" + j, i * 1000))
                    .then(() => func("Boom!", -1));
            }

            return promise
                .then(() => done())
                .catch(() => done.fail());
        }, TIMEOUT);

        const testForLoop = `[${funcName}] - Promise in a for loop.`;
        it(testForLoop, (done) => {
            logger.info(testForLoop);
            let promise = Promise.resolve("");

            for (let i = 2, j = 1; i > 0; --i, ++j) {
                promise = promise
                    .then(() => func("Loop #" + j, i * 1000))
                    .then(() => func("Boom!", -1));
            }

            return promise
                .then(() => done())
                .catch(() => done.fail());
        }, TIMEOUT);

    });
});
