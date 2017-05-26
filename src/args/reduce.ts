import { KeyValue } from "./parse";

export const reduce = ($args: KeyValue[]): any => {
    return $args.reduce((acc, keyValue) => {
        (acc as any)[(keyValue.key || "_")] = keyValue.value;
        return acc;
    }, {});
};