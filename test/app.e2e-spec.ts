import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { ConfigModule } from '@nestjs/config'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let access_token = ''

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          envFilePath: '.development.env',
          isGlobal: true,
        }),
      ],
    }).compile()

    app = moduleFixture.createNestApplication().setGlobalPrefix('api')
    await app.init()
  })

  it('/auth/sign-up (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/sign-up')
      .send({
        email: 'artem.khar9uk@gmail.com',
        password: 'horor2008',
        name: 'Artem HzDev 5',
      })
    expect(res.body.user.name).toBe('Artem HzDev 5')
    expect(res.statusCode).toBe(201)
  })

  it('/auth/login (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/auth/login')
      .send({ email: 'artem.khar9uk@gmail.com', password: 'horor2008' })
    expect(res.body.user.id).toBe(4)
    expect(res.statusCode).toBe(200)

    access_token = res.body.refreshToken
  })

  it('/auth/access-token/:access-token (POST)', async () => {
    const res = await request(app.getHttpServer()).post(
      `/api/auth/access-token/${access_token}`,
    )
    expect(res.body.user.id).toBe(4)
    expect(res.statusCode).toBe(201)
  })
})
