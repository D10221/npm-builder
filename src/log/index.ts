import * as winston from "winston";
import { CLILoggingLevel as LogLevel } from "winston";
import { TransportType } from "./types";
import { getLogger } from "./get-logger";

let _logger: winston.LogMethod;

export const getCurrentLogger = (level?: LogLevel, transports?: TransportType[]) => {
    if (_logger) { return _logger; }
    _logger = getLogger(level, transports);
    return _logger;
};
