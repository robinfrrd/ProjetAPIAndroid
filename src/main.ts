import { NestFactory } from '@nestjs/core';
import { DailyModule } from './daily.module';
import { DailyService } from './daily.service';
import { Daily } from './Daily';

async function bootstrap() {
  // Creation of the Application
  const app = await NestFactory.create(DailyModule);
  console.log("~ Application created ~");

  // Recover the data on OpenData
  global.XMLHttpRequest = require("xhr2");
  const xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://api.covidtracking.com/v1/us/daily.json";

  // Data processing
  xhr.open(method, url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);

      // Access in DailyService
      const dailyService = app.get(DailyService);

            let instance
            for(instance in result) {

              let total_death
              if(result[instance]['death']=="null")
                total_death=0
              else
                total_death=result[instance]['death']

              let total_positive
              if(result[instance]['positive']=="null")
                total_positive=0
              else
                total_positive=result[instance]['positive']

              let total_negative
              if(result[instance]['negative']=="null")
                total_negative=0
              else
                total_negative=result[instance]['negative']

              let day_death
              if(result[instance]['deathIncrease']=="null")
                day_death=0
              else
                day_death=result[instance]['deathIncrease']

              let day_positive
              if(result[instance]['positiveIncrease']=="null")
                day_positive=0
              else
                day_positive=result[instance]['positiveIncrease']

              let onVentilatorCurrently
              if(result[instance]['onVentilatorCurrently']=="null")
                onVentilatorCurrently=0
              else
                onVentilatorCurrently=result[instance]['onVentilatorCurrently']

              const daily: Daily = {
                date: result[instance]['date'],
                total_death: total_death,
                total_positive: total_positive,
                total_negative: total_negative,
                day_death: day_death,
                day_positive: day_positive,
                onVentilatorCurrently: onVentilatorCurrently,
                favorite: false
              }
              dailyService.addDaily(daily)
          }
      console.log("~ Data recovered ~");
    }
  }
  xhr.send();

  // Launch the Application
  //en local
  //await app.listen(3000);
  await app.listen(8080);
  console.log("~ Application launched ~");
}
bootstrap();