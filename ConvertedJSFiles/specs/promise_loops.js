"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("../utils/promises");
describe("Testing promises in loops...", () => {
    it("No loops, just promise chaining.", (done) => {
        return promises_1.nativePromise("First", 3000)
            .then(() => promises_1.nativePromise("Second", 2000))
            .then(() => promises_1.nativePromise("Third", 1000))
            .then(() => done())
            .catch(() => done.fail());
    });
    it("Promise in Array.reduce().", (done) => {
        let nums = [1, 2, 3, 4, 5];
        return nums.reduce((promise, next) => {
            return promise
                .then(() => promises_1.nativePromise("Loop #" + next, (5 - next) * 1000));
        }, Promise.resolve())
            .then(() => done())
            .catch(() => done.fail());
    });
    it("Promise in a for loop.", (done) => {
        let promise = Promise.resolve();
        for (let i = 5, j = 1; i > 0; ++i, ++j) {
            promise.then(() => promises_1.nativePromise("Loop #" + j, i * 1000));
        }
        return promise
            .then(() => done())
            .catch(() => done.fail());
    });
});
