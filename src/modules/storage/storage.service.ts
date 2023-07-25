import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageFile } from './entity/storage-file.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { IPagination } from 'src/common/interface/pagination.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateStorageFileDto } from './dto/create-storage-file.dto';
import { STORAGE_MAX_USER_FILE_COUNT } from './constant/storage.constant';

@Injectable()
export class StorageService {
    constructor(
        @InjectRepository(StorageFile) private storageFileRepository: Repository<StorageFile>
    ) { }

    async create(
        { name, detail, type }: CreateStorageFileDto,
        { mimetype, size, path }: Express.Multer.File,
        user?: User
    ): Promise<StorageFile> {
        const file = this.storageFileRepository.create({ name, detail, type, mime: mimetype, size, path });
        if (user) {
            file.user = user;
            await this.validateMaxFileCount(user);
        }
        return await this.storageFileRepository.save(file);
    }

    async findAll({ limit, page }: PaginationDto, mergeCondition: boolean = false): Promise<IPagination<StorageFile>> {
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

    async findAllByUser(user: User): Promise<StorageFile[]> {
        return await this.storageFileRepository.findBy({ user: { id: user.id } });
    }

    async findById(id: string, exception: boolean = false): Promise<StorageFile> {
        const file = await this.storageFileRepository.findOneBy({ id });
        if (exception && !file) {
            throw new NotFoundException('storage.invalid-id');
        }
        return file;
    }

    async validateMaxFileCount(user: User) {
        const count = await this.storageFileRepository.countBy({ user: { id: user.id } });
        if (count >= STORAGE_MAX_USER_FILE_COUNT) {
            throw new ConflictException('storage.file-count-limit');
        }
    }
}
