import { parse, KeyValue, KeyValueTypeKeys } from "./parse";
import { reduce } from "./reduce";
import { isNullOrUndefined as isNull } from "util";
import { ArgsQuery } from "./args-query";

const isType = (type: KeyValueTypeKeys, x?: KeyValue) => {
    return x && typeof x.value === type;
};
export interface ArgDescription {
    key: string;
    displayName?: string;
    required?: boolean;
    type?: KeyValueTypeKeys;
}

export const Query = (options?: { expected?: ArgDescription[], argv?: string[] }): ArgsQuery => {
    options = options || {};
    const list = parse(options.argv || process.argv.slice(2));

    if (options.expected) {

        for (const o of options.expected) {
            const found = list.find(x => x.key === o.key);

            if (o.required) {
                if (!found) {
                    throw new Error(`${o.displayName || o.key} is required`);
                }
            }

            if (found && o.type && !isType(o.type, found)) {
                throw new Error(`expected ${found.key} to be ${o.type}`);
            }

        }
    }

    let _values: any;
    const values: any = () => _values ? _values : (_values = reduce(list));

    const hasFlag = (key: string): boolean => {
        return !isNull(Object.getOwnPropertyNames(values()).find(x => x === key));
    };

    const getFlagAsString = (key: string, defaultValue?: string): string => {
        const found = (list.find(x => x.key === key));
        if (isNull(found)) return defaultValue || "";
        if (Array.isArray(found.value)) return found.value.map(x => `${x}`).join(" ");
        return `${found.value}`;
    };

    const getFlagAsNumber = (key: string, defaultValue?: number): number => {
        const found = (list.find(x => x.key === key) || {});
        return !isNull(found) &&
            typeof found.value === "number" ? found.value : defaultValue || Number.NaN;
    };

    /**
     *
     * @param key false defauls
     */
    const GetFlagAsBool = (key: string, defaultValue?: boolean): boolean => {
        const found = (list.find(x => x.key === key) || {});
        return !isNull(found) &&
            typeof found.value === "boolean" ? found.value : defaultValue || false;
    };

    const GetFlagAsList = (key: string, defaultValue?: string[]): string[] => {
        const found = (list.find(x => x.key === key) || {});
        if (isNull(found)) return defaultValue || [];

        if (typeof found.value === "string") {
            return [found.value];
        }
        if (Array.isArray(found.value)) {
            return found.value;
        }
        return defaultValue || [];
    };

    const getParamAsString = (): string => {
        const value = (list.find(x => x.key === "_") || {}).value;
        return typeof value === "string" ? value : "";
    };

    const getParamAsNumber = (): number => {
        const value = (list.find(x => x.key === "_") || {}).value;
        return typeof value === "number" ? value : Number.NaN;
    };

    const getParamAsBool = (): boolean => {
        const value = (list.find(x => x.key === "_") || {}).value;
        return typeof value === "boolean" ? value : false;
    };

    const getParamAsList = (): string[] => {
        const found = list.find(x => x.key === "_");
        if (isNull(found)) {
            return [];
        }
        if (Array.isArray(found.value)) return found.value;
        return [`${found.value}`];
    };

    return {
        list,
        values,
        hasFlag,
        getFlagAsString,
        getFlagAsNumber,
        GetFlagAsBool,
        GetFlagAsList,
        getParamAsString,
        getParamAsBool,
        getParamAsNumber,
        getParamAsList,
    };
};
