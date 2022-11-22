import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { Service } from 'typedi';
import { AppError } from '../utility/AppError';

@Service()
@Middleware({ type: 'after' })
export class LoggingMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: AppError, request: any, response: any): void {
    const err = new AppError('Un Expected Error', 500);
    response.json(err);
  }
}
