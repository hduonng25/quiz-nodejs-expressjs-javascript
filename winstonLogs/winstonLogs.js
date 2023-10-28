import winston from "winston";
import appRootPath from "app-root-path";
import "winston-daily-rotate-file";

const options = {
    file: {
        level: 'info',
        filename: `${appRootPath}/logs/app.log`,
        json: true,
        maxsize: 5242880,
        colorize: false
    },

    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: false
    },
};

const myLogs = new winston.createLogger({
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss.SSS"}),
        winston.format.printf(info => `${info.timestamp} [${info.label === undefined ? "" : info.lable}${info.funName === undefined ? "" : "-" + info.funName}][${info.level}] : ${info.message}`)
    ),

    transports: [
        new winston.transports.DailyRotateFile({
            name: 'file',
            filename: `${appRootPath}/logs/app.log`
        }),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
});

myLogs.stream = {
    write: function (message, encoding) {
        myLogs.info(message);
    },
};

export default myLogs;