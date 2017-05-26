export type KeyValueTypeKeys = "number" | "boolean" | "string" | "array";
export type KeyValueType = number | boolean | string | string[];
export interface KeyValue {
    key?: string;
    value?: KeyValueType;
}

const xCase = (x: string) => {
    return x.replace(/-+(\w)/, (_, n) => n.toUpperCase());
};
const clean = (x: string) => {
    return xCase(x.replace(/^-+/, ""));
};

/**
 * negatives?
 */
const isNumber = (x: string) => {
    return /^\d+(\.\d+)?$/.test(x);
};

const isBoolean = (x: string) => {
    return /(true|false)/i.test(x);
};

const convert = (x: string) => {
    return isNumber(x) ? Number.parseFloat(x) :
        (isBoolean(x) ? x.toLowerCase() === "true" : x);
};

const isFlag = (x: string) => /^\-.*/.test(x);

export const parse = (args: string[]) => {

    const empty = "_";
    let prevKey = empty;
    const result: KeyValue[] = [];

    const add = (key: string, value: string) => {
        result.push({ key, value: convert(value) });
    };

    for (let i = 0; i < args.length; i++) {
        const value = args[i];
        // flags
        if (isFlag(value)) {
            prevKey = clean(value);
            if (result.find(x => x.key === prevKey)) {
                throw new Error(`too many '${prevKey}'`);
            }
            const next = args[i + 1];
            if (isFlag(next) ||
                // last
                i === args.length - 1 ||
                // parameter group
                next.indexOf("=") !== -1) {
                // set default value, ust present
                result.push({ key: prevKey, value: true });
            }
            continue;
        }
        // parameter grouping
        if (value.indexOf("=") !== -1) {
            const parts = value.split("=");
            const key = clean(parts[0]);
            if (result.find(x => x.key === key)) {
                throw new Error(`too many '${key}'`);
            }
            add(key, parts[1]);
            prevKey = empty;
            continue;
        }
        // values
        const found = result.find(x => x.key === prevKey);
        if (found) {
            if (!Array.isArray(found.value)) {
                found.value = [`${found.value}`];
            }
            found.value.push(value);
            continue;
        }

        add(prevKey, value);
    }
    return result;
};