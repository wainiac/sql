import * as Promise from "bluebird";

let resolve = (input: string): Promise<string> => {
    return Promise.resolve()
        .then(_ => {
            return `${input}:done`;
        })
}

export { resolve };