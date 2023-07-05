import { Controller, Get, Post, Patch, Delete, Query, Param, Body } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
    @ApiOkResponse({
        description: 'Receive Array Of Categories With Paginate'
    })
    async getCategories(@Query() findDto: FindCategoriesDto): Promise<IPagination<Category>> {
        return await this.categoryService.findAll(findDto);
    }

    @Get('/:id')
    @ApiOkResponse({
        description: 'Receive Category Instance'
    })
    @ApiNotFoundResponse({
        description: 'Category Not Found'
    })
    async getCategoryById(@Param('id') id: string): Promise<Category> {
        return this.categoryService.findById(id);
    }

    @Post('/')
    @Roles(Role.Admin)
    @ApiCreatedResponse({
        description: 'Category Created Successfully'
    })
    @ApiConflictResponse({
        description: 'Duplicate Category With Same Name'
    })
    async createCategory(@Body() createDto: CreateCategoryDto): Promise<Category> {
        return await this.categoryService.create(createDto);
    }

    @Patch('/:id')
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: 'Category Updated Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Category Not Found'
    })
    async updateCategory(
        @Param('id') id: string,
        @Body() updateDto: UpdateCategoryDto
    ) {
        return await this.categoryService.update(id, updateDto);
    }

    @Delete('/:id')
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: 'Category Removed Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Category Not Found'
    })
    async removeCategory(@Param('id') id: string) {
        return await this.categoryService.remove(id);
    }
}
