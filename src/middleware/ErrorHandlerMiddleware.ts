import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Middleware()
export class ErrorHandlerMiddleware implements ExpressMiddlewareInterface {
  // interface implementation is optional

  use(request: any, response: any, next: (err?: any) => any): any {
    console.log(JSON.stringify(response));
  }
}
