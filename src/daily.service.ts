import { Injectable } from '@nestjs/common';
import { Daily } from './Daily';

@Injectable()
export class DailyService {

  private readonly storage: Map<number, Daily>= new Map();

  getAllDaily(): Daily[] | undefined {
    return Array.from(this.storage.values())
  }

  getDailyFromDate(date : string) : Daily | undefined {
    return this.storage.get(parseInt(date))
  }

  getDailyBetweenDate(date1 : string, date2 : string) : Daily[] | undefined {
    return Array.from(this.storage.values()).filter(
      Daily1 => {
        const year = parseInt(Daily1.date.toString().substring(0,4))
        const month = parseInt(Daily1.date.toString().substring(4,6))
        const day = parseInt(Daily1.date.toString().substring(6,8))

        const year1 = parseInt(date1.substring(0,4))
        const month1 = parseInt(date1.substring(4,6))
        const day1 = parseInt(date1.substring(6,8))

        const year2 = parseInt(date2.substring(0,4))
        const month2 = parseInt(date2.substring(4,6))
        const day2 = parseInt(date2.substring(6,8))
        if(year>=year1 && year<=year2) {
          if(month>=month1 && month<=month2) {
            if(day>=day1 && day<=day2) {
              return 1;
            }
          }
        }
        else return 0;
      }
    )
  }

  addDaily(daily : Daily): void {
    this.storage.set(daily.date, daily)
  }

  doFavorite(date : string) : void {
    const val=this.storage.get(parseInt(date))
    this.storage.delete(parseInt(date))
    const dailyFavorite : Daily = {
      date: val.date,
      total_death: val.total_death,
      total_positive: val.total_positive,
      total_negative: val.total_negative,
      day_death: val.day_death,
      day_positive: val.day_positive,
      onVentilatorCurrently: val.onVentilatorCurrently,
      favorite: !val.favorite
    }
    this.storage.set(dailyFavorite.date, dailyFavorite)
  }

  getFavorites() : Daily[] {
    return Array.from(this.storage.values()).filter(
      Daily1 => {
        if (Daily1.favorite == true)
          return 1
        else
          return 0
      }
    )
  }

  getTotalNumberofDaily() {
    return this.storage.size
  }
}
