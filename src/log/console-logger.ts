import * as winston from "winston";
import { CLILoggingLevel as LogLevel } from "winston";
export const ConsoleLogger = (level: LogLevel) => new winston.transports.Console({
    level
});