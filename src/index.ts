import 'reflect-metadata';
import express from 'express';
import config from 'config';
import morgan from 'morgan';
import { createExpressServer, useContainer } from 'routing-controllers';

import { Container } from 'typedi';
import { AppDataSource } from './utility/data-source';
// import { AppDataSource } from './utility/data-source';

useContainer(Container);
require('dotenv').config();

const port = config.get<number>('port');

const app = createExpressServer({
  controllers: [`${__dirname}/controllers/*.ts`],
  middlewares: [`${__dirname}/middlewares/*.ts`],
});

AppDataSource.initialize().then(() => {
  // 1. Body parser
  app.use(express.json({ limit: '10kb' }));

  // 2. Logger
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

  app.listen(port);
  console.log(`Server started on port: ${port}`);
}).catch((e: any) => {
  console.log(e);
});

// UNHANDLED ROUTE
// app.all('*', (req: Request, res: Response, next: NextFunction) => {
//   next(new AppError(404, `Route ${req.originalUrl} not found`));
// });

// // GLOBAL ERROR HANDLER
// app.use(
//   (error: AppError, req: Request, res: Response, next: NextFunction) => {
//     error.status = error.status || 'error';
//     error.statusCode = error.statusCode || 500;

//     res.status(error.statusCode).json({
//       status: error.status,
//       message: error.message,
//     });
//   },
// );

// AppDataSource.initialize()
//   .then(async () => {
//     const app = express();

//     // 1. Body parser
//     app.use(express.json({ limit: '10kb' }));

//     // 2. Logger
//     if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//     // ROUTES
//     app.use('/', (req: Request, res: Response) => {
//       res.status(200).json({
//         status: 'success',
//         message: 'Welcome to Node.js, we are happy to see you',
//       });
//     });

//     // UNHANDLED ROUTE
//     // app.all('*', (req: Request, res: Response, next: NextFunction) => {
//     //   next(new AppError(404, `Route ${req.originalUrl} not found`));
//     // });

//     // // GLOBAL ERROR HANDLER
//     // app.use(
//     //   (error: AppError, req: Request, res: Response, next: NextFunction) => {
//     //     error.status = error.status || 'error';
//     //     error.statusCode = error.statusCode || 500;

//     //     res.status(error.statusCode).json({
//     //       status: error.status,
//     //       message: error.message,
//     //     });
//     //   },
//     // );

//     app.listen(5000);
//     console.log(`Server started on port: ${port}`);
//   })
//   .catch((error) => console.log(error));
