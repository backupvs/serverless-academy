import { IsUrl } from 'class-validator';

export class CreateShortLinkDto {
  @IsUrl({
    require_protocol: true,
    protocols: ['http', 'https'],
  })
  url: string;
}
