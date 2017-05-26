import * as path from "path";
import { current as query } from "./args";
export const root = path.resolve(process.cwd(), query.value.getFlagAsString("root", process.cwd()));