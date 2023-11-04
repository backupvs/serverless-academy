import { injectable, inject } from 'inversify';
import { ShortLinkRepository } from '../../database/repositories/short-link.repository';
import HttpError from '../../common/errors/http.error';
import { HttpCodes } from '../../common/errors/http-error-codes.enum';
import { IShortLinkRepository } from '../../database/repositories/short-link.repository.interface';

@injectable()
export class RootService {
  constructor(
    @inject(ShortLinkRepository)
    private readonly shortLinkRespository: IShortLinkRepository,
  ) {}

  async findDestinationByPath(path: string): Promise<string> {
    const result = await this.shortLinkRespository.findByPath(path);

    if (!result) {
      throw new HttpError(HttpCodes.NotFound, 'This URL points to nothing');
    }

    return result.destination;
  }
}
