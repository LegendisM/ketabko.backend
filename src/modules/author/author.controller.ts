import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthorService } from './author.service';
import { IPagination } from 'src/common/interface/pagination.interface';
import { Author } from './entity/author.entity';
import { FindAuthorsDto } from './dto/find-author.dto';
import { Roles } from '../user/decorator/role.decorator';
import { Role } from '../user/interface/role.interface';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@ApiTags('Authors')
@Controller({
    path: '/authors',
    version: '1'
})
export class AuthorController {
    constructor(
        private authorService: AuthorService
    ) { }

    @Get('/')
    @ApiOkResponse({
        description: 'Receive Array Of Authors With Paginate'
    })
    async getAuthors(@Query() findDto: FindAuthorsDto): Promise<IPagination<Author>> {
        return await this.authorService.findAll(findDto);
    }

    @Get('/:id')
    @ApiOkResponse({
        description: 'Receive Author Instance'
    })
    @ApiNotFoundResponse({
        description: 'Author Not Found'
    })
    async getAuthorById(@Param('id') id: string): Promise<Author> {
        return await this.authorService.findById(id, true);
    }

    @Post('/')
    @Roles(Role.Admin)
    @ApiCreatedResponse({
        description: 'Author Created Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Avatar StorageFile Not Found'
    })
    async createAuthor(@Body() createDto: CreateAuthorDto): Promise<Author> {
        return await this.authorService.create(createDto);
    }

    @Put('/:id')
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: 'Author Updated Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Author|Avatar(StorageFile) Not Found'
    })
    async updateAuthor(
        @Param('id') id: string,
        @Body() updateDto: UpdateAuthorDto
    ) {
        await this.authorService.update(id, updateDto);
    }

    @Delete('/:id')
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: 'Author Deleted Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Author Not Found'
    })
    async removeAuthor(@Param('id') id: string) {
        await this.authorService.remove(id);
    }
}