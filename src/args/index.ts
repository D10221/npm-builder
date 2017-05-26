export * from "./query";
export * from "./args-query";
import { Query } from "./query";
import { create } from "../lazy";
export const current = create(Query);
