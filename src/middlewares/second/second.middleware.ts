import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class SecondMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('JE suis le second Middleware');

    next();
  }
}
