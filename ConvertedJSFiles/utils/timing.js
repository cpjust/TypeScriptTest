"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
function sleep(time) {
    return new Promise((resolve, reject) => {
        config_1.logger.trace("Sleeping for: " + time);
        setTimeout(resolve, time);
        config_1.logger.trace("Slept for: " + time);
    });
}
exports.sleep = sleep;
;
// module.exports {
//     sleep,
// };
