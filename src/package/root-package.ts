import { create } from "../lazy";
import { root } from "../root";
import { getPackage } from "./get-package";
export const current = create(() => {
    return getPackage(root);
});
