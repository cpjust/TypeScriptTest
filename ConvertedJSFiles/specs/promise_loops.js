"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const promises_1 = require("../utils/promises");
const TIMEOUT = 10000;
describe("Testing promises in loops...", () => {
    const testPromiseChain = "No loops, just promise chaining.";
    it(testPromiseChain, (done) => {
        config_1.logger.info(testPromiseChain);
        return promises_1.nativePromise("First", 3000)
            .then(() => promises_1.nativePromise("Boom!", -1))
            .then(() => promises_1.nativePromise("Second", 2000))
            .then(() => promises_1.nativePromise("Third", 1000))
            .then(() => done())
            .catch(() => done.fail());
    }, TIMEOUT);
    const testArrayReduce = "Promise in Array.reduce().";
    it(testArrayReduce, (done) => {
        config_1.logger.info(testArrayReduce);
        let nums = [1, 2, 3];
        return nums.reduce((promise, next) => {
            return promise
                .then(() => promises_1.nativePromise("Loop #" + next, (nums.length + 1 - next) * 1000))
                .then(() => promises_1.nativePromise("Boom!", -1));
        }, Promise.resolve())
            .then(() => done())
            .catch(() => done.fail());
    }, TIMEOUT);
    const testForLoopInThen = "Promise in a for loop in a then().";
    it(testForLoopInThen, (done) => {
        config_1.logger.info(testForLoopInThen);
        let promise = Promise.resolve("");
        for (let i = 3, j = 1; i > 0; --i, ++j) {
            promise = promise
                .then(() => promises_1.nativePromise("Loop #" + j, i * 1000))
                .then(() => promises_1.nativePromise("Boom!", -1));
        }
        return promise
            .then(() => done())
            .catch(() => done.fail());
    }, TIMEOUT);
    const testForLoop = "Promise in a for loop.";
    it(testForLoop, (done) => {
        config_1.logger.info(testForLoop);
        let promise = Promise.resolve("");
        for (let i = 3, j = 1; i > 0; --i, ++j) {
            promise = promise
                .then(() => promises_1.nativePromise("Loop #" + j, i * 1000))
                .then(() => promises_1.nativePromise("Boom!", -1));
        }
        return promise
            .then(() => done())
            .catch(() => done.fail());
    }, TIMEOUT);
});
