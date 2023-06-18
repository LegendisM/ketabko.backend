import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { FindCategoriesDto } from './dto/find-category.dto';
import { IPagination } from 'src/common/interface/pagination.interface';
import { Category } from './entity/category.entity';
import { Roles } from '../user/decorator/role.decorator';
import { Role } from '../user/interface/role.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller({
    path: '/categories',
    version: '1'
})
export class CategoryController {
    constructor(
        private categoryService: CategoryService
    ) { }

    @Get('/')
    async getCategories(@Query() findDto: FindCategoriesDto): Promise<IPagination<Category>> {
        return await this.categoryService.findAll(findDto);
    }

    @Get('/:id')
    async getCategoryById(@Param('id') id: string): Promise<Category> {
        return this.categoryService.findById(id);
    }

    @Post('/')
    @Roles(Role.Admin)
    async createCategory(@Body() createDto: CreateCategoryDto): Promise<Category> {
        return await this.categoryService.create(createDto);
    }

    @Put('/:id')
    @Roles(Role.Admin)
    async updateCategory(
        @Param('id') id: string,
        @Body() updateDto: UpdateCategoryDto
    ) {
        return await this.categoryService.update(id, updateDto);
    }

    @Delete('/:id')
    @Roles(Role.Admin)
    async removeCategory(@Param('id') id: string) {
        return await this.categoryService.remove(id);
    }
}
