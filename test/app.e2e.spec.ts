import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DailyModule } from '../src/daily.module';
import * as request from 'supertest';
import supertest from 'supertest';

describe('Daily US API', () => {
  let app: INestApplication;
  let httpRequester: supertest.SuperTest<supertest.Test>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DailyModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpRequester = request(app.getHttpServer());
  });

  it('/GET dailyUS', async () => {
    // Recover result of the get request
    const request = await httpRequester
      .get('/dailyUS')
      .expect(200)

    // Test the wanted result
    expect(request.body).toEqual(expect.any(Array));
  });

  it('/GET dailyUS/:string', async () => {
    // First prepare the data by adding a daily
    await httpRequester.post('/dailyUS').send({
      date: 20201125,
      total_death: 48,
      total_positive: 30,
      total_negative: 25,
      day_death: 2,
      day_positive: 10,
      onVentilatorCurrently: 30,
      favorite: false
    });

    // Recover result of the get request
    const request = await httpRequester
      .get('/dailyUS/20201125')
      .expect(200)

    // Test the wanted result
    expect(request.body).toEqual({
      date: 20201125,
      total_death: 48,
      total_positive: 30,
      total_negative: 25,
      day_death: 2,
      day_positive: 10,
      onVentilatorCurrently: 30,
      favorite: false,
    });
  });

  it('/GET dailyUS/favorites', async () => {
    // First prepare the data by adding a daily
    await httpRequester.post('/dailyUS').send({
      date: 20201125,
      total_death: 48,
      total_positive: 30,
      total_negative: 25,
      day_death: 2,
      day_positive: 10,
      onVentilatorCurrently: 30,
      favorite: true
    });

    // Recover result of the get request
    const request = await httpRequester
      .get('/dailyUS/favorites')
      .expect(200)

    // Test the wanted result
    expect(request.body).toEqual([{
      date: 20201125,
      total_death: 48,
      total_positive: 30,
      total_negative: 25,
      day_death: 2,
      day_positive: 10,
      onVentilatorCurrently: 30,
      favorite: true
    }]);
  });

  it('/GET dailyUS/b/:date1/:date2', async () => {
    // First prepare the data by adding a daily
    await httpRequester.post('/dailyUS').send({
      date: 20201125,
      total_death: 48,
      total_positive: 30,
      total_negative: 25,
      day_death: 2,
      day_positive: 10,
      onVentilatorCurrently: 30,
      favorite: false
    });

    await httpRequester.post('/dailyUS').send({
      date: 20201124,
      total_death: 42,
      total_positive: 30,
      total_negative: 25,
      day_death: 2,
      day_positive: 10,
      onVentilatorCurrently: 30,
      favorite: false
    });

    await httpRequester.post('/dailyUS').send({
      date: 20201123,
      total_death: 32,
      total_positive: 30,
      total_negative: 25,
      day_death: 2,
      day_positive: 10,
      onVentilatorCurrently: 30,
      favorite: false
    });

    // Recover result of the get request
    const request = await httpRequester
      .get('/dailyUS/b/20201123/20201125')
      .expect(200)

    // Test the wanted result
    expect(request.body).toEqual([{
      date: 20201125,
      day_death: 2,
      day_positive: 10,
      favorite: false,
      onVentilatorCurrently: 30,
      total_death: 48,
      total_negative: 25,
      total_positive: 30
    },
      {
        date: 20201124,
        day_death: 2,
        day_positive: 10,
        favorite: false,
        onVentilatorCurrently: 30,
        total_death: 42,
        total_negative: 25,
        total_positive: 30
      },
      {
        date: 20201123,
        day_death: 2,
        day_positive: 10,
        favorite: false,
        onVentilatorCurrently: 30,
        total_death: 32,
        total_negative: 25,
        total_positive: 30
      }
    ]);
  });

  it('/PUT dailyUS/:date', async () => {
    // First prepare the data by adding a daily
    await httpRequester.post('/dailyUS').send({
      date: 20201125,
      total_death: 48,
      total_positive: 30,
      total_negative: 25,
      day_death: 2,
      day_positive: 10,
      onVentilatorCurrently: 30,
      favorite: false
    });

    // Put in favorite
    await httpRequester.put('/dailyUS/20201125').expect(200);

    // Recover result of the get request
    const request = await httpRequester
      .get('/dailyUS/20201125')
      .expect(200)

    // Test the wanted result
    expect(request.body).toEqual({
      date: 20201125,
      total_death: 48,
      total_positive: 30,
      total_negative: 25,
      day_death: 2,
      day_positive: 10,
      onVentilatorCurrently: 30,
      favorite: true
    });
  });
});