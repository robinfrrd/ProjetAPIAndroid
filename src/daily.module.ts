import { Module } from '@nestjs/common';
import { DailyController } from './daily.controller';
import { DailyService } from './daily.service';

@Module({
  imports: [],
  controllers: [DailyController],
  providers: [DailyService],
})
export class DailyModule {}
