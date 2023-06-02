import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "../../user/user.service";
import { User } from "../../user/entity/user.entity";

describe('Auth Service', () => {
    let service: AuthService;
    let mockUsers: User[] = [];
    let mockUserService: Partial<UserService> = {
        create: ({ username, password }) => {
            const user = { id: 'uuid', username, password } as User;
            mockUsers.push(user);
            return Promise.resolve(user);
        },
        findOne: (filter, exception) => {
            const user = mockUsers.find((user) => (Object.keys(filter).some((field) => user[field] == filter[field])));
            if (exception && !user) {
                throw new Error('Invalid User');
            }
            return Promise.resolve(user);
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: 'test'
                })
            ],
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: mockUserService
                }
            ]
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should create service instance', () => {
        expect(service).toBeDefined();
    });

    describe('signup', () => {
        it('should success signup', async () => {
            const result = await service.signup({ username: 'alexa', password: '1234' });
            expect(result).toBeDefined();
            expect(result.state).toBe(true);
            expect(result.message).toBe('signup_success');
            expect(result.token).toBeDefined();
        });

        it('should cancel signup for already username used', async () => {
            const result = await service.signup({ username: 'alexa', password: '1234' });
            expect(result).toBeDefined();
            expect(result.state).toBe(false);
            expect(result.message).toBe('already_username_used');
            expect(result.token).toBe('');
        });
    });

    describe('signin', () => {
        it('should cancel signin for invalid username', async () => {
            const result = await service.signin({ username: 'alexa-wrong', password: '1234' });
            expect(result).toBeDefined();
            expect(result.state).toBe(false);
            expect(result.message).toBe('invalid_information');
            expect(result.token).toBe('');
        });

        it('should cancel signin for invalid password', async () => {
            const result = await service.signin({ username: 'alexa', password: 'wrong-password' });
            expect(result).toBeDefined();
            expect(result.state).toBe(false);
            expect(result.message).toBe('invalid_information');
            expect(result.token).toBe('');
        });

        it('should success signin', async () => {
            const result = await service.signin({ username: 'alexa', password: '1234' });
            expect(result).toBeDefined();
            expect(result.state).toBe(true);
            expect(result.message).toBe('signin_success');
            expect(result.token).toBeDefined();
        });
    });
});