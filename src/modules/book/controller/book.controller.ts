import { Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseUUIDPipe } from '@nestjs/common';
import { BookService } from './../service/book.service';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindBooksDto } from './../dto/book/find-book.dto';
import { IPagination } from './../../../common/interface/pagination.interface';
import { BookEntity } from '../entity/book.entity';
import { CreateBookDto } from './../dto/book/create-book.dto';
import { UpdateBookDto } from './../dto/book/update-book.dto';
import { Roles } from './../../user/decorator/role.decorator';
import { Role } from './../../user/interface/role.interface';

@ApiTags('Books')
@Controller({
    path: '/books',
    version: '1'
})
export class BookController {
    constructor(
        private bookService: BookService
    ) { }

    @Get('/')
    @ApiOkResponse({
        description: 'Receive Array Of Books with Paginate'
    })
    async getBooks(@Query() findDto: FindBooksDto): Promise<IPagination<BookEntity>> {
        return await this.bookService.findAll(findDto);
    }

    @Get('/:id')
    @ApiOkResponse({
        description: 'Receive Book Instance'
    })
    @ApiNotFoundResponse({
        description: 'Book Not Found'
    })
    async getBookById(@Param('id', ParseUUIDPipe) id: string): Promise<BookEntity> {
        return await this.bookService.findById(id, true);
    }

    @Post('/')
    @Roles(Role.Admin)
    @ApiCreatedResponse({
        description: 'Book Created Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Cover|Audio StorageFile Not Found'
    })
    async createBook(@Body() createDto: CreateBookDto): Promise<BookEntity> {
        return await this.bookService.create(createDto);
    }

    @Patch('/:id')
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: 'Book Updated Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Book|Cover|Audio Not Found'
    })
    async updateBook(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateDto: UpdateBookDto
    ) {
        await this.bookService.update(id, updateDto);
    }

    @Delete('/:id')
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: 'Book Deleted Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Book Not Found'
    })
    async removeBook(@Param('id', ParseUUIDPipe) id: string) {
        await this.bookService.remove(id);
    }
}
