import { CreateShortLinkDto } from './dto/create-short-link.dto';

export interface IShortLinkService {
  createShortLink(createShortLinkDto: CreateShortLinkDto): Promise<string>;
}
