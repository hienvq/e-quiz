import { mongoMigrateCli } from 'mongo-migrate-ts';
import * as dotenv from 'dotenv';
dotenv.config();

mongoMigrateCli({
  uri: process.env.MONGODB_CONNECTION_STRING,
  migrationsDir: __dirname,
  migrationsCollection: 'migrations',
});
