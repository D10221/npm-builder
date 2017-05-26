import * as util from "util";
export class Lazy<T> {
    constructor(private fty: () => T) {

    }
    _value: T;
    get value() {
        if (util.isNullOrUndefined(this._value)) {
            this._value = this.fty();
        }
        return this._value;
    }
}

export const create = <T>(fty: () => T) => new Lazy<T>(fty);