import * as winston from "winston";

import { TransportType, } from "./types";
import { filePath } from "./file-path";
import { defaultTransports, defaultlevel } from "./config";
import { CLILoggingLevel as LogLevel } from "winston";

import { FileLogger } from "./file-logger";
import { ConsoleLogger } from "./console-logger";
/**
 * get new
 */
export const getLogger = (
        level?: LogLevel,
        transports?: TransportType[]): winston.LogMethod => {
    // ...
    level = level || defaultlevel;
    transports = transports || defaultTransports;
    winston.configure({
        transports: [
            FileLogger(filePath() , level),
            ConsoleLogger(level)
        ],
    });
    return winston.log;
};
