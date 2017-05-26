import * as path from "path";
import { root } from "../root";
import { getPackages } from "./get-packages";

export const localPackages = getPackages(path.resolve(root, "packages"));
