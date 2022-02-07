/* eslint-disable no-console */
function logger(path) {
    return (msg, ...args) =>
        Object.keys(args).length > 0
            ? console.log(`[${path}] ${msg}`, ...args)
            : console.log(`[${path}] ${msg}`);
}

export default logger;
