import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';

import { DatabaseService } from './database/database.service';
import { IRootService } from './resources/root/root.service.interface';
import { IShortLinkRepository } from './database/repositories/short-link.repository.interface';
import { IShortLinkService } from './resources/shortlink/short-link.service.interface';
import { RootService } from './resources/root/root.service';
import { ShortLinkRepository } from './database/repositories/short-link.repository';
import { ShortLinkService } from './resources/shortlink/short-link.service';
import { errorHandler } from './common/middleware/error-handler.middleware';

import './resources/shortlink/short-link.controller';
import './resources/root/root.controller';

export interface AppOptions {
  readonly port: number;
  readonly hostname: string;
}

export default class App {
  private app: express.Application;
  private server: InversifyExpressServer;
  private db: DatabaseService;
  private container: Container;

  constructor(private readonly options: AppOptions) {
    this.initIocContainer();
    this.server = new InversifyExpressServer(this.container);
    this.db = this.container.get(DatabaseService);
    this.initMiddleware();
    this.initErrorHandler();
    this.app = this.server.build();
  }

  public async start() {
    try {
      const { port, hostname } = this.options;
      await this.db.init();

      this.app.listen(port, hostname, () => {
        console.log(`Listening on ${hostname}:${port}`);
      });
    } catch (err) {
      const msg = (err as Error).message || '';
      console.error('Error while connecting to database:', msg);
      await this.db.disconnect();
    }
  }

  public initIocContainer() {
    this.container = new Container();
    this.container.bind(DatabaseService).toSelf().inSingletonScope();
    this.container.bind<IRootService>(RootService).toSelf().inSingletonScope();
    this.container
      .bind<IShortLinkRepository>(ShortLinkRepository)
      .toSelf()
      .inSingletonScope();
    this.container
      .bind<IShortLinkService>(ShortLinkService)
      .toSelf()
      .inSingletonScope();
  }

  private initMiddleware() {
    this.server.setConfig((app) => {
      app.use(express.json());
    });
  }

  private initErrorHandler() {
    this.server.setErrorConfig((app) => {
      app.use(errorHandler);
    });
  }
}
