import * as path from "path";
import { TransportType } from "./types";
import { getPackage } from "../package";
export const LogFolder = "logs";
export const defaultTransports: TransportType[] = ["file", "console"];
export const environment = process.env.NODE_ENV || "production";
export const loggerName = getPackage(path.join(__dirname, "../../"));
export const defaultlevel = process.env.NODE_ENV === "development" ? "debug" : "error";