# US coronavirus API /// Jeremie LEVAIN & Robin FERRAND \\\ 

NestJS documentation website: https://docs.nestjs.com

## 📝 Goal

The goal of this project is to create a simple Rest API and deploy it into Clevercloud 
This Rest API will be used in an android app and aims at manipulating daily coronavirus data in the USA

The API has different routes

## 🕸 Routes

Get all the US daily (since 2020/04/02):
  - Method: GET
  - Route: /dailyUS
  
Get a specific US daily :
  - Method: GET
  - Route: /dailyUS/date
with date having the format yearmonthday (exemple : 20201116)

Get favorites list :
  - Method: GET
  - Route: /dailyUS/favorites
  
Save a daily in favorites:
  - Method: PUT
  - Route: /dailyUS/date 
with date having the format yearmonthday (exemple : 20201116)

Get a time series of US daily :
  - Method: GET
  - Route: /dailyUS/b/date1/date2
with date{n} having the format yearmonthday (exemple : 20201116)
date1 needs to be previous to date2 
All US daily Between date1 and date2 included will be returned
  