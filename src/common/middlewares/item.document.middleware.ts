import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import slugify from 'slugify';

@Injectable()
export class ItemDocumentMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // implement slugify to the item, that is going to be created using the post method
    // think of disabling the option to update the slugify (disallow users from changng the slug of the item)

    const itemSlug = slugify(req.body.name, { lower: true });
    console.log(req.body);
    req.body = { ...req.body, itemSlug };
    console.log(req.body);

    next();
  }
}
