import * as winston from "winston";
import { CLILoggingLevel as LogLevel } from "winston";
export const FileLogger = (path: string, logLevel: LogLevel) => new winston.transports.DailyRotateFile({
    filename: path,
    handleExceptions: false,
    json: false,
    datePattern: "yyyy-MM-dd.",
    prepend: true,
    level: logLevel,
});