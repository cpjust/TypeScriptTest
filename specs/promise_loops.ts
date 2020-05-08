import { logger } from "../config";
import { browser, protractor } from 'protractor';
import { sleep } from "../utils/timing";
import { nativePromise } from "../utils/promises";

describe("Testing promises in loops...", () => {
    it("No loops, just promise chaining.", (done) => {
        return nativePromise("First", 3000)
            .then(() => nativePromise("Second", 2000))
            .then(() => nativePromise("Third", 1000))
            .then(() => done())
            .catch(() => done.fail());
    });

    it("Promise in Array.reduce().", (done) => {
        let nums = [1, 2, 3, 4, 5];

        return nums.reduce((promise, next) => {
            return promise
                .then(() => nativePromise("Loop #" + next, (5 - next) * 1000));
        }, Promise.resolve())
            .then(() => done())
            .catch(() => done.fail());
    });

    it("Promise in a for loop.", (done) => {
        let promise = Promise.resolve();

        for (let i = 5, j = 1; i > 0; ++i, ++j) {
            promise.then(() => nativePromise("Loop #" + j, i * 1000));
        }

        return promise
            .then(() => done())
            .catch(() => done.fail());
    });

});
