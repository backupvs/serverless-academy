import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { RootService } from './root.service';
import { IRootService } from './root.service.interface';

@controller('*')
export class RootConroller {
  constructor(@inject(RootService) private readonly rootService: IRootService) {}

  @httpGet('*')
  async createShortUrl(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const path = req.path.slice(1); // remove '/'
    try {
      const destination = await this.rootService.findDestinationByPath(path);
      res.redirect(destination);
    } catch (err) {
      next(err);
    }
  }
}
