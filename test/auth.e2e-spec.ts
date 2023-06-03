import request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/modules/app/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";

describe('Auth Module', () => {
    let app: INestApplication;
    let mockUser = {
        username: `test${Date.now().toString().substring(0, 10)}`,
        password: 'test'
    };


    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [
                {
                    provide: APP_PIPE,
                    useValue: new ValidationPipe({ transform: true, whitelist: true })
                }
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('/auth/signup (POST)', () => {
        it('should return 400 on missing dto', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/signup')
                .send({});
            expect(response.status).toBe(400);
            expect(response.body)
            expect(response.body.message).toBeInstanceOf(Array<String>);
        });

        it('should signup successfully', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/signup')
                .send(mockUser);
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.state).toBe(true);
            expect(response.body.token).toBeDefined();
        });

        it('should failed signup on already used information', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/signup')
                .send(mockUser);
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.state).toBe(false);
        });
    });

    describe('/auth/signin (POST)', () => {
        it('should return 400 on missing dto', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/signin')
                .send({});
            expect(response.status).toBe(400);
            expect(response.body)
            expect(response.body.message).toBeInstanceOf(Array<String>);
        });

        it('should cancel signin for invalid information', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/signin')
                .send({ ...mockUser, ...{ username: 'wrong@user' } });
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.state).toBe(false);
        });

        it('should signin successfully', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/signin')
                .send(mockUser);
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.state).toBe(true);
            expect(response.body.token).toBeDefined();
        });
    });
});