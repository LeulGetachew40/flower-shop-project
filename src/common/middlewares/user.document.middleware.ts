import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { generateUsername } from 'unique-username-generator';
@Injectable()
export class UserNameGeneratorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.body.username) {
      req.body.username = generateUsername('', 3, 15);
    }
    next();
  }
}
