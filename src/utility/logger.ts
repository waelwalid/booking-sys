// that how you can configure winston logger

const { createLogger, format, transports } = require('winston');

export const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({
      timestamp, level, message, service,
    }) => `[${timestamp}] ${service} ${level}: ${message}`),
  ),
  defaultMeta: {
    service: 'booking-sys',
  },
});
