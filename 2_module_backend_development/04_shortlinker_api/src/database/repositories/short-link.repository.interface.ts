import { CreateShortLinkDto } from '../../resources/shortlink/dto/create-short-link.dto';
import { ShortLink } from '../../resources/shortlink/entities/short-link.entity';

export interface IShortLinkRepository {
  findByPath(url: string): Promise<ShortLink | null>;
  create(createShortLinkDto: CreateShortLinkDto): Promise<ShortLink>;
}
