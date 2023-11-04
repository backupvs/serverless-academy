import { injectable, inject } from 'inversify';
import { ShortLink } from '../../resources/shortlink/entities/short-link.entity';
import { DatabaseService } from '../database.service';
import { IShortLinkRepository } from './short-link.repository.interface';
import { CreateShortLinkDto } from '../../resources/shortlink/dto/create-short-link.dto';

@injectable()
export class ShortLinkRepository implements IShortLinkRepository {
  constructor(
    @inject(DatabaseService) private readonly databaseContext: DatabaseService,
  ) {}

  async findByPath(path: string): Promise<ShortLink | null> {
    const result = await this.databaseContext
      .getShortLinkModel()
      .findOne({ path })
      .exec();

    return result;
  }

  async create(createShortLinkDto: CreateShortLinkDto): Promise<ShortLink> {
    const result = await this.databaseContext
      .getShortLinkModel()
      .create({ destination: createShortLinkDto.url });

    return result;
  }
}
