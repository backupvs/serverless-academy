import { injectable, inject } from 'inversify';
import { ShortLinkRepository } from '../../database/repositories/short-link.repository';
import { IShortLinkService } from './short-link.service.interface';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { IShortLinkRepository } from '../../database/repositories/short-link.repository.interface';

@injectable()
export class ShortLinkService implements IShortLinkService {
  constructor(
    @inject(ShortLinkRepository)
    private readonly shortLinkRespository: IShortLinkRepository,
  ) {}

  async createShortLink(createShortLinkDto: CreateShortLinkDto): Promise<string> {
    const result = await this.shortLinkRespository.create(createShortLinkDto);

    return result.path;
  }
}
