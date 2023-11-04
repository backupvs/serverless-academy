export interface IRootService {
  findDestinationByPath(path: string): Promise<string>;
}
