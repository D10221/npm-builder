
import * as util from "util";
import { Package } from "./Package";
import { ArgsQuery } from "../args";

export const packageSelection = (args: ArgsQuery, packages: Package[]): Package[] => {

    const list = args.getParamAsList();
    if (!list.length) return packages;

    const wrong = list.filter(p => util.isNullOrUndefined(packages.find(x => x.name === p)));
    if (wrong.length) {
        throw new Error(`package not found: '${wrong.join(", ")}'`);
    }
    const selection = packages.filter(p => list.indexOf(p.name as string) !== -1);

    if (!selection.length) {
        throw new Error("Package Selection Empty");
    }

    return selection;
};
