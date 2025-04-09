import { Module } from '@nestjs/common';
import { SolditemService } from './solditem.service';
import { SolditemController } from './solditem.controller';

@Module({
  controllers: [SolditemController],
  providers: [SolditemService],
})
export class SolditemModule {}
