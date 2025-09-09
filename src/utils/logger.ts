import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
        json: 4,
    },
    colors: {
        error: "red",
        warn: "yellow",
        info: "green",
        debug: "blue",
        json: "magenta",
    },
};

winston.addColors(logLevels.colors);

const logFormat = winston.format.printf(
    ({ level, message, timestamp, stack }) =>
        `${timestamp} [${level}]: ${stack || message}`
);

const debugRotateTransport = new DailyRotateFile({
    dirname: "logs",
    filename: "app-debug-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "60d",
    level: "debug",
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        logFormat
    ),
});

const jsonRotateTransport = new DailyRotateFile({
    dirname: "logs",
    filename: "app-json-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "60d",
    level: "json",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
    ),
});

const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        logFormat
    ),
});

export const logger: winston.Logger & {
    json: (message: any) => winston.Logger;
} = winston.createLogger({
    level: "debug",
    transports: [consoleTransport, debugRotateTransport],
}) as any;

export const jsonLogger = winston.createLogger({
    levels: logLevels.levels,
    level: "json",
    transports: [jsonRotateTransport],
}) as any;
