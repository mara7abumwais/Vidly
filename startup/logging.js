import winston from 'winston';

export const logging = () => {
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.File({
                filename: 'logs/error.log',
                level: 'error'
            }),
        ]
    });

    // Handle uncaught exceptions
    logger.exceptions.handle(new winston.transports.File({
        filename: 'logs/exceptions.log'
    }));

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
        throw reason;
    });

    // If not in production then log to the `console`
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }));
    }
    return logger;
};
