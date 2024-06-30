import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/api/tasks/2')
    console.log(res)
    expect(res.body.id).toBe(2)
    expect(res.body.createdById).toBe(2)
    expect(res.statusCode).toBe(200)
  })
})
