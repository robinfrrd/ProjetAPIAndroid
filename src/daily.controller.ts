import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { DailyService } from './daily.service';
import { Daily } from './Daily';

@Controller('dailyUS')
export class DailyController {
  constructor(private readonly dailyService: DailyService) {
    }

  @Get()
  getAllDaily(): Daily[] | undefined {
    return this.dailyService.getAllDaily();
  }

  @Get('/:string')
  getDailyFromDate(@Param('string') string): Daily[] | Daily {
    if(string=="favorites") {
      return this.dailyService.getFavorites()
    }
    else
      return this.dailyService.getDailyFromDate(string);
  }

  @Get('/b/:date1/:date2')
  getDailyBetweenDate(@Param('date1') date1, @Param('date2') date2): Daily[] {
    return this.dailyService.getDailyBetweenDate(date1, date2);
  }

  @Put('/:date')
  SelectFavorite(@Param('date') date): void {
    this.dailyService.doFavorite(date)
  }

  @Post()
  createDaily(@Body() newDaily: Daily): void {
    this.dailyService.addDaily(newDaily);
  }
}


