import * as Promise from "bluebird";

let resolve = (): Promise<string> => {
    return Promise.resolve()
        .then(_ => {
            return "done";
        })
}

export { resolve };