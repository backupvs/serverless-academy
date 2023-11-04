import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BaseMiddleware } from 'inversify-express-utils';

import HttpError from '../errors/http.error';
import { HttpCodes } from '../errors/http-error-codes.enum';

export class ValidateBody extends BaseMiddleware {
  constructor(private readonly dtoClass: any) {
    super();
  }

  async handler(req: Request, res: Response, next: NextFunction) {
    const errors = await validate(plainToInstance(this.dtoClass, req.body));

    if (errors.length > 0) {
      return next(new HttpError(HttpCodes.BadRequest, 'Invalid URL'));
    }

    next();
  }

  static with(dtoClass: any) {
    const validateBodyMiddleware = new ValidateBody(dtoClass);
    return validateBodyMiddleware.handler.bind(validateBodyMiddleware);
  }
}
