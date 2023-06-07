import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../user.service";
import { User } from "../entity/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UpdateUserDto } from "../dto/update-user.dto";

describe('User Service', () => {
    let service: UserService;
    let mockUserRepository = {
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
        findOneBy: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository
                }
            ]
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should create service instance', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('create new user', async () => {
            const mockUserValue = { id: '1', username: 'alexa', email: '', password: '1234' } as User;
            mockUserRepository.create.mockResolvedValue(mockUserValue);
            mockUserRepository.save.mockResolvedValue(mockUserValue);
            const user = await service.create({ username: mockUserValue.username, password: mockUserValue.password });
            expect(user).toBeDefined();
        });
    });

    describe('findOne', () => {
        it('invalid fineOne with throw exception', async () => {
            let exception
            mockUserRepository.findOne.mockResolvedValue(null);
            try {
                const user = await service.findOne({ username: 'alexa-invalid' }, true);
            } catch (error) {
                exception = error;
            }
            expect(exception).toBeDefined();
            expect(exception.status).toBe(404);
        });

        it('invalid findOne with return null', async () => {
            mockUserRepository.findOne.mockResolvedValue(null);
            const user = await service.findOne({ username: 'alexa-invalid' });
            expect(user).toBe(null);
        });

        it('findOne valid user', async () => {
            mockUserRepository.findOne.mockResolvedValue({ username: 'alexa' } as User);
            const user = await service.findOne({ username: 'alexa' });
            expect(user).toBeDefined();
            expect(user.username).toBe('alexa');
        });
    });

    describe('findById', () => {
        it('invalid findById with throw error', async () => {
            let exception
            mockUserRepository.findOneBy.mockResolvedValue(null);
            try {
                const user = await service.findById('uuid-invalid', true);
            } catch (error) {
                exception = error;
            }
            expect(exception).toBeDefined();
            expect(exception.status).toBe(404);
        });

        it('invalid findById with return null', async () => {
            mockUserRepository.findOneBy.mockResolvedValue(null);
            const user = await service.findById('uuid-invalid');
            expect(user).toBe(null);
        });

        it('findById valid user', async () => {
            mockUserRepository.findOneBy.mockResolvedValue({ id: 'uuid', username: 'alexa' } as User);
            const user = await service.findById('uuid');
            expect(user).toBeDefined();
            expect(user.id).toBe('uuid');
        });
    });

    describe('update', () => {
        it('invalid id to find valid user with throw exception', async () => {
            let exception
            mockUserRepository.findOneBy.mockResolvedValue(null);
            try {
                const user = await service.update('uuid-invalid', { username: '', email: '', password: '' });
            } catch (error) {
                exception = error;
            }
            expect(exception).toBeDefined();
            expect(exception.status).toBe(404);
        });

        it('update user successfully', async () => {
            const mockUserValue = { id: 'uuid', username: 'alexa', email: '' } as User;
            const mockUpdateValue = { username: 'alexa', email: '' } as UpdateUserDto;
            mockUserRepository.findOneBy.mockResolvedValue(mockUserValue);
            mockUserRepository.save.mockResolvedValue(mockUserValue);
            const user = await service.update('uuid', mockUpdateValue);
            expect(user).toBeDefined();
            expect(user.id).toBe('uuid');
        });
    });

    describe('remove', () => {
        it('invalid id to find valid user with throw exception', async () => {
            let exception;
            mockUserRepository.findOneBy.mockResolvedValue(null);
            try {
                const user = await service.remove('uuid');
            } catch (error) {
                exception = error;
            }
            expect(exception).toBeDefined();
            expect(exception.status).toBe(404);
        });

        it('remove user successfully', async () => {
            const mockUserValue = { id: 'uuid', username: 'alexa' } as User;
            mockUserRepository.findOneBy.mockResolvedValue(mockUserValue);
            mockUserRepository.remove.mockResolvedValue(mockUserValue);
            const user = await service.remove('uuid');
            expect(user).toBeDefined();
            expect(user.id).toBe('uuid');
        });
    });
});