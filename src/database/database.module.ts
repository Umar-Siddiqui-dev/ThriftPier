
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.Providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
