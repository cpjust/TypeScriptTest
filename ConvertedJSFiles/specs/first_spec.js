"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const protractor_1 = require("protractor");
//import { async } from "q";
describe('Testing promises', function () {
    function printLater(msg, time) {
        config_1.logger.debug("Sleeping for " + time + " ms...");
        return protractor_1.browser.sleep(time).then(() => config_1.logger.info(msg));
    }
    function nativePromise(msg, time) {
        return new Promise(() => {
            printLater(msg, time);
        });
    }
    function protractorPromise(msg, time) {
        return new protractor_1.protractor.promise.Promise(() => {
            printLater(msg, time);
        });
    }
    it('promise chain 1', function () {
        /* Prints the following:
        [TRACE] default - Start
        [DEBUG] default - Sleeping for 1000 ms...
        [TRACE] default - End
        [INFO] default - --1
        [DEBUG] default - Sleeping for 2000 ms...
        [INFO] default - --2
        [DEBUG] default - Sleeping for 3000 ms...
        [INFO] default - --3
        [INFO] default - --done
        */
        config_1.logger.trace("Start");
        printLater("--1", 1000).then(() => {
            printLater("--2", 2000).then(() => {
                printLater("--3", 3000).thenFinally(() => {
                    config_1.logger.info("--done");
                });
            });
        });
        config_1.logger.trace("End");
    });
    it('promise chain 1.1', function () {
        /* Prints the following:
        [TRACE] default - Start
        [DEBUG] default - Sleeping for 1000 ms...
        [TRACE] default - End
        [INFO] default - --1
        */
        config_1.logger.trace("Start");
        nativePromise("--1", 1000).then(() => {
            nativePromise("--2", 2000).then(() => {
                nativePromise("--3", 3000).finally(() => {
                    config_1.logger.info("--done");
                });
            });
        });
        config_1.logger.trace("End");
    });
    it('promise chain 1.2', function () {
        /* Prints the following:
        [TRACE] default - Start
        [DEBUG] default - Sleeping for 1000 ms...
        [TRACE] default - End
        [INFO] default - --1
        */
        config_1.logger.trace("Start");
        protractorPromise("--1", 1000).then(() => {
            protractorPromise("--2", 2000).then(() => {
                protractorPromise("--3", 3000).thenFinally(() => {
                    config_1.logger.info("--done");
                });
            });
        });
        config_1.logger.trace("End");
    });
    it('promise chain 2', function () {
        /* Prints the following:
        [TRACE] default - Start
        [DEBUG] default - Sleeping for 1000 ms...
        [TRACE] default - End
        [INFO] default - --1
        [DEBUG] default - Sleeping for 2000 ms...
        [INFO] default - --2
        [DEBUG] default - Sleeping for 3000 ms...
        [INFO] default - --3
        [INFO] default - --done
        */
        config_1.logger.trace("Start");
        printLater("--1", 1000).then(() => {
            printLater("--2", 2000);
        }).then(() => {
            printLater("--3", 3000);
        }).thenFinally(() => {
            config_1.logger.info("--done");
        });
        config_1.logger.trace("End");
    });
    it('promise chain 2.1', function () {
        /* Prints the following:
        [TRACE] default - Start
        [DEBUG] default - Sleeping for 1000 ms...
        [TRACE] default - End
        [INFO] default - --1
        */
        config_1.logger.trace("Start");
        nativePromise("--1", 1000).then(() => {
            nativePromise("--2", 2000);
        }).then(() => {
            nativePromise("--3", 3000);
        }).finally(() => {
            config_1.logger.info("--done");
        });
        config_1.logger.trace("End");
    });
    it('promise chain 2.2', function () {
        /* Prints the following:
        [TRACE] default - Start
        [DEBUG] default - Sleeping for 1000 ms...
        [TRACE] default - End
        [INFO] default - --1
        */
        config_1.logger.trace("Start");
        protractorPromise("--1", 1000).then(() => {
            protractorPromise("--2", 2000);
        }).then(() => {
            protractorPromise("--3", 3000);
        }).thenFinally(() => {
            config_1.logger.info("--done");
        });
        config_1.logger.trace("End");
    });
    it('await promise 3', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // Works as expected.
            yield config_1.logger.trace("Start");
            yield printLater("--1", 1000);
            yield printLater("--2", 2000);
            yield printLater("--3", 3000);
            yield config_1.logger.info("--done");
            yield config_1.logger.trace("End");
        });
    });
    it('await promise 3.1', function () {
        return __awaiter(this, void 0, void 0, function* () {
            /* Prints the following:
            [TRACE] default - Start
            [DEBUG] default - Sleeping for 1000 ms...
            [INFO] default - --1
            */
            yield config_1.logger.trace("Start");
            yield nativePromise("--1", 1000);
            yield nativePromise("--2", 2000); // Gets stuck after "--1"
            yield nativePromise("--3", 3000);
            yield config_1.logger.info("--done");
            yield config_1.logger.trace("End");
        });
    });
    fit('await promise 3.2', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_1.logger.trace("Start");
            yield protractorPromise("--1", 1000);
            yield protractorPromise("--2", 2000); // Gets stuck after "--1"
            yield protractorPromise("--3", 3000);
            yield config_1.logger.info("--done");
            yield config_1.logger.trace("End");
        });
    });
    xit('should add a todo', function () {
        protractor_1.browser.get('https://angularjs.org'); // Entering application url in browser
        // Enter text under TODO
        protractor_1.element(protractor_1.by.model("todoList.todoText")).sendKeys('write first protractor test');
        protractor_1.element(protractor_1.by.css("input[type='submit']")).click(); // Clicks on 'Add' button
        // Getting all Todo lists displayed
        protractor_1.element.all(protractor_1.by.repeater('todo in')).then(function (todoList) {
            // Asserting the TODO's count as 3
            expect(todoList.length.toString()).toEqual('3');
            todoList[2].getText().then(function (text) {
                //Verifying newly entered TODO is added
                expect(text).toEqual('write first protractor test');
            });
        });
    });
});
