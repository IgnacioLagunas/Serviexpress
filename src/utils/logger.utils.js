import winston from 'winston';
import config from '../config/config.js';

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'white redBG bold',
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    http: 'magenta',
    debug: 'grey',
  },
};

export let logger;

if (config.ENVIROMENT === 'production') {
  logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevels.colors }),
          winston.format.simple()
        ),
      }),
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.prettyPrint()
        ),
      }),
    ],
  });
}

if (config.ENVIROMENT === 'development') {
  logger = winston.createLogger({
    levels: customLevels.levels,
    format: winston.format.combine(
      winston.format.colorize({ colors: customLevels.colors }),
      winston.format.simple()
    ),
    transports: [new winston.transports.Console({ level: 'debug' })],
  });
}
