import 'reflect-metadata';
import express from 'express';
import config from 'config';
import morgan from 'morgan';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { AppDataSource } from './utility/data-source';
import { JobManager } from './jobs/CronManager';
import { logger } from './utility/logger';

useContainer(Container);
require('dotenv').config();

const port = config.get<number>('port');

const app = createExpressServer({
  controllers: [`${__dirname}/controllers/*.{ts,js}`],
  middlewares: [`${__dirname}/middleware/*.{ts,js}`],
});

AppDataSource.initialize().then(() => {
  // Body parser
  app.use(express.json({ limit: '10kb' }));

  // Logger

  app.use(morgan(
    'request-id :id :remote-addr  :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status ":referrer" ":user-agent"',
    {
      stream: {
        write: (message) => {
          logger.info(message.trim());
        },
      },
    },
  ));

  app.listen(port);
  console.log(`Server started on port: ${port}`);

  // initiate cron jobs
  const cron = new JobManager();
  cron.run();
}).catch((e: any) => {
  console.log(`ERROR:: ${e} | ${JSON.stringify(e)}`);
});
