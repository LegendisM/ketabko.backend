import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { ApiTags } from '@nestjs/swagger';
import { FindBooksDto } from './dto/find-books.dto';
import { IPagination } from 'src/common/interface/pagination.interface';
import { Book } from './entity/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from 'src/modules/user/decorator/role.decorator';
import { Role } from 'src/modules/user/interface/role.interface';

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
    async getBooks(@Query() findDto: FindBooksDto): Promise<IPagination<Book>> {
        return await this.bookService.findAll(findDto);
    }

    @Roles(Role.Admin)
    @Post('/')
    async createBook(@Body() createDto: CreateBookDto): Promise<Book> {
        return await this.bookService.create(createDto);
    }

    @Roles(Role.Admin)
    @Put('/:id')
    async updateBook(
        @Param('id') id: string,
        @Body() updateDto: UpdateBookDto
    ) {
        await this.bookService.update(id, updateDto);
    }

    @Roles(Role.Admin)
    @Delete('/:id')
    async removeBook(@Param('id') id: string) {
        await this.bookService.remove(id);
    }
}