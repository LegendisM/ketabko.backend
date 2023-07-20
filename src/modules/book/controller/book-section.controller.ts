import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/modules/user/decorator/role.decorator';
import { Role } from 'src/modules/user/interface/role.interface';
import { BookSectionService } from '../service/book-section.service';
import { BookSection } from '../entity/book-section.entity';
import { CreateBookSectionDto } from '../dto/book-section/create-book-section.dto';
import { UpdateBookSectionDto } from '../dto/book-section/update-book-section.dto';

@ApiTags('Book Sections')
@Controller({
    path: '/book-sections',
    version: '1'
})
export class BookSectionController {
    constructor(
        private bookSectionService: BookSectionService
    ) { }

    @Get('/')
    @ApiOkResponse({
        description: 'Receive Array Of Books Sections'
    })
    async getBooksSections(): Promise<BookSection[]> {
        return await this.bookSectionService.findAll();
    }

    @Get('/:id')
    @ApiOkResponse({
        description: 'Receive Book Section Instance'
    })
    @ApiNotFoundResponse({
        description: 'Book Section Not Found'
    })
    async getBookSectionById(@Param('id') id: string): Promise<BookSection> {
        return await this.bookSectionService.findById(id, true);
    }

    @Post('/')
    @Roles(Role.Admin)
    @ApiCreatedResponse({
        description: 'Book Section Created Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Book Not Found'
    })
    async createBookSection(@Body() createDto: CreateBookSectionDto): Promise<BookSection> {
        return await this.bookSectionService.create(createDto);
    }

    @Put('/:id')
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: 'Book Section Updated Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Book Section Not Found'
    })
    async updateBookSection(
        @Param('id') id: string,
        @Body() updateDto: UpdateBookSectionDto
    ) {
        await this.bookSectionService.update(id, updateDto);
    }

    @Delete('/:id')
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: 'Book Section Deleted Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Book Section Not Found'
    })
    async removeBookSection(@Param('id') id: string) {
        await this.bookSectionService.remove(id);
    }
}
