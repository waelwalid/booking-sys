import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'before' })
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any): any {
    const { headers } = request;
    if (headers.secret !== process.env.SECRET) {
      response.status(403);
      response.json({
        message: 'unauthenticated',
        error: 401,
      });
    }
    next();
  }
}
