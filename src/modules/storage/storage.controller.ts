import { Controller, Get, Post, UseInterceptors, UploadedFile, Body, Query, SerializeOptions } from '@nestjs/common';
import { ApiConflictResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { Auth } from '../auth/decorator/auth.decorator';
import { CurrentUser } from '../user/decorator/user.decorator';
import { User } from '../user/entity/user.entity';
import { StorageFile } from './entity/storage-file.entity';
import { Roles } from '../user/decorator/role.decorator';
import { Role } from '../user/interface/role.interface';
import { IPagination } from 'src/common/interface/pagination.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseStorageFilePipe } from './pipe/parse-storage-file.pipe';
import { CompressedFile } from 'src/common/decorator/compress.decorator';
import { CreateStorageFileDto } from './dto/create-storage-file.dto';

@ApiTags('Storages')
@Controller({
    path: '/storages',
    version: '1'
})
@Auth()
export class StorageController {
    constructor(
        private storageService: StorageService
    ) { }

    @Get('/')
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: 'Receive Array Of Files With Paginate'
    })
    async getAllFiles(@Query() paginationDto: PaginationDto): Promise<IPagination<StorageFile>> {
        return await this.storageService.findAll(paginationDto);
    }

    @Get('/me')
    @ApiOkResponse({
        description: 'Receive Array Of User Files'
    })
    async getUserFiles(@CurrentUser() user: User): Promise<StorageFile[]> {
        return await this.storageService.findAllByUser(user);
    }

    @Post('/')
    @Roles(Role.Admin)
    @UseInterceptors(FileInterceptor('file'))
    @ApiOkResponse({
        description: 'File Storage Created As Admin'
    })
    async uploadFile(
        @Body() createDto: CreateStorageFileDto,
        @UploadedFile(new ParseStorageFilePipe())
        @CompressedFile() file: Express.Multer.File
    ) {
        return await this.storageService.create(createDto, file);
    }

    @Post('/me')
    @SerializeOptions({ excludePrefixes: ['user'] })
    @UseInterceptors(FileInterceptor('file'))
    @ApiOkResponse({
        description: 'File Storage Created As User'
    })
    @ApiConflictResponse({
        description: 'File Max Count Limitation'
    })
    async uploadUserFile(
        @Body() createDto: CreateStorageFileDto,
        @CurrentUser() user: User,
        @UploadedFile(new ParseStorageFilePipe())
        @CompressedFile() file: Express.Multer.File
    ) {
        return await this.storageService.create(createDto, file, user);
    }
}
