import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { Service } from 'typedi';
import morgan from 'morgan';
import * as uuid from 'uuid';

@Service()
@Middleware({ type: 'before' })
export class LoggingMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any): any {
    morgan.token('id', () => uuid.v4());
    morgan.token('req', () => JSON.stringify({
      headers: request.headers,
      body: request.body,
    }));
    next();
  }
}
