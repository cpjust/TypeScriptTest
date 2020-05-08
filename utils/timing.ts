import { logger } from "../config";

export function sleep(time) {
    return new Promise((resolve, reject) => {
        logger.trace("Sleeping for: " + time);
        setTimeout(resolve, time);
        logger.trace("Slept for: " + time);
    });
};
