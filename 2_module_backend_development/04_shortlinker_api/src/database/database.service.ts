import { injectable } from 'inversify';
import mongoose from 'mongoose';
import { shortLinkSchema } from './models/short-link.model';

@injectable()
export class DatabaseService {
  private db: typeof mongoose;

  async init() {
    console.log('Connecting to database...');
    this.db = await mongoose.connect(process.env.MONGO_URI!, {
      dbName: process.env.MONGO_DATABASE,
    });

    console.log('Successfully connected to database');
  }

  getShortLinkModel() {
    return this.db.model('ShortLink', shortLinkSchema);
  }

  async disconnect() {
    return this.db.disconnect();
  }
}
