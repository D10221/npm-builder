
import { KeyValue } from "./parse";

export interface ArgsQuery {
    list: KeyValue[];
    values: any;
    hasFlag(key: string): boolean;
    getFlagAsString(key: string, defaultValue?: string): string;
    getFlagAsNumber(key: string, defaultValue?: number): number;
    GetFlagAsBool(key: string, defaultValue?: boolean): boolean;
    GetFlagAsList(key: string, defaultValue?: string[]): string[];
    getParamAsString(): string;
    getParamAsBool(): boolean;
    getParamAsNumber(): number;
    getParamAsList(): string[];
}