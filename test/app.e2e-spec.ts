import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { ConfigModule } from '@nestjs/config'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let access_token = ''
  let randomName = ''

  beforeAll(async () => {
    randomName = `HzDev ${Math.random()}`
  })

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
        email: `artem.khar${Math.random()}uk@gmail.com`,
        password: 'horor2008',
        name: randomName,
      })
    expect(res.body.user.name).toBe(randomName)
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

  it('/tasks/:userId (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/api/tasks/4')
    expect(res.body.length).toBe(27)
  })

  it('/tasks/create (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/tasks/create')
      .send({
        title: `This new task for test ${Math.random()}`,
        userEmail: 'artem.khar10uk@gmail.com',
      })
    expect(res.statusCode).toBe(201)
    expect(res.body.createById).toBe(5)
  })
})
