import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';

import { IShortLinkService } from './short-link.service.interface';
import { ShortLinkService } from './short-link.service';
import { ValidateBody } from '../../common/middleware/validate-body.middleware';
import { CreateShortLinkDto } from './dto/create-short-link.dto';

@controller('/short-link')
export class ShortLinkController {
  constructor(
    @inject(ShortLinkService) private readonly shortLinkService: IShortLinkService,
  ) {}

  @httpPost('/', ValidateBody.with(CreateShortLinkDto))
  async createShortLink(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const baseUrl = process.env.BASE_URL;

    try {
      const shortId = await this.shortLinkService.createShortLink(req.body);
      const shortLink = `${baseUrl}/${shortId}`;
      res.status(201).json({ shortLink });
    } catch (err) {
      next(err);
    }
  }
}
