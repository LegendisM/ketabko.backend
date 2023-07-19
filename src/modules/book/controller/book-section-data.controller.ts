import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/modules/user/decorator/role.decorator';
import { Role } from 'src/modules/user/interface/role.interface';
import { BookSection } from '../entity/book-section.entity';
import { CreateBookSectionDto } from '../dto/book-section/create-book-section.dto';
import { UpdateBookSectionDto } from '../dto/book-section/update-book-section.dto';
import { BookSectionDataService } from '../service/book-section-data.service';
import { BookSectionData } from '../entity/book-section-data.entity';
import { CurrentUser } from 'src/modules/user/decorator/user.decorator';
// TODO: here - in progress
@ApiTags('Books Sections Data')
@Controller({
    path: '/books-sections-data',
    version: '1'
})
export class BookSectionDataController {
    constructor(
        private bookSectionDataService: BookSectionDataService
    ) { }

    @Get('/me')
    @ApiOkResponse({
        description: 'Receive Array Of Books Sections Datas Of User'
    })
    async getUserBookSectionsData(@CurrentUser()): Promise<BookSectionData[]> {
        return await this.bookSectionDataService.findAllByUser();
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
