import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageFileEntity } from './entity/storage-file.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { IPagination } from './../../common/interface/pagination.interface';
import { PaginationDto } from './../../common/dto/pagination.dto';
import { CreateStorageFileDto } from './dto/create-storage-file.dto';
import { STORAGE_MAX_USER_FILE_COUNT } from './constant/storage.constant';
import { DatabaseSource } from 'src/database/interface/database.interface';

@Injectable()
export class StorageService {
    constructor(
        @InjectRepository(StorageFileEntity, DatabaseSource.Primary) private storageFileRepository: Repository<StorageFileEntity>
    ) { }

    async create(
        { name, detail, type }: CreateStorageFileDto,
        { mimetype, size, path }: Express.Multer.File,
        user?: UserEntity
    ): Promise<StorageFileEntity> {
        const file = this.storageFileRepository.create({ name, detail, type, mime: mimetype, size, path });
        if (user) {
            file.user = user;
            await this.validateMaxFileCount(user);
        }
        return await this.storageFileRepository.save(file);
    }

    async findAll({ limit, page }: PaginationDto, mergeCondition: boolean = false): Promise<IPagination<StorageFileEntity>> {
        const files = await this.storageFileRepository.find({
            skip: (page - 1) * limit,
            take: limit - 1
        });
        const filesCount = await this.storageFileRepository.count();
        return {
            items: files,
            limit: limit,
            page: page,
            total: Math.ceil(filesCount / limit)
        }
    }

    async findAllByUser(user: UserEntity): Promise<StorageFileEntity[]> {
        return await this.storageFileRepository.findBy({ user: { id: user.id } });
    }

    async findById(id: string, exception: boolean = false): Promise<StorageFileEntity> {
        const file = await this.storageFileRepository.findOneBy({ id });
        if (exception && !file) {
            throw new NotFoundException('storage.invalid-id');
        }
        return file;
    }

    async validateMaxFileCount(user: UserEntity) {
        const count = await this.storageFileRepository.countBy({ user: { id: user.id } });
        if (count >= STORAGE_MAX_USER_FILE_COUNT) {
            throw new ConflictException('storage.file-count-limit');
        }
    }
}
