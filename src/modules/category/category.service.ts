import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { IPagination } from 'src/common/interface/pagination.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindCategoriesDto } from './dto/find-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) { }

    async create(createDto: CreateCategoryDto): Promise<Category> {
        await this.preventDuplicate(createDto.name);
        const category = this.categoryRepository.create(createDto);
        return await this.categoryRepository.save(category);
    }

    async findAll({ name, limit, page }: FindCategoriesDto): Promise<IPagination<Category>> {
        const where: FindOptionsWhere<Category>[] = [
            (name) ?
                { name: Like(`%${name}%`) }
                : null
        ].filter(condition => !!condition);
        const categories = await this.categoryRepository.find({
            where: where,
            skip: (page - 1) * limit,
            take: limit - 1
        });
        const categoriesCount = await this.categoryRepository.count({ where });
        return {
            items: categories,
            limit: limit,
            page: page,
            total: Math.ceil(categoriesCount / limit)
        }
    }

    async findById(id: string, exception: boolean = false): Promise<Category> {
        const category = await this.categoryRepository.findOneBy({ id });
        if (exception && !category) {
            throw new NotFoundException('category.invalid-id');
        }
        return category;
    }

    async findByName(name: string, exception: boolean = false): Promise<Category> {
        const category = await this.categoryRepository.findOneBy({ name });
        if (exception && !category) {
            throw new NotFoundException('category.invalid-name');
        }
        return category;
    }

    async update(id: string, updateDto: UpdateCategoryDto): Promise<Category> {
        const category = await this.findById(id, true);
        Object.assign(category, updateDto);
        return await this.categoryRepository.save(category);
    }

    async remove(id: string): Promise<Category> {
        const category = await this.findById(id, true);
        return await this.categoryRepository.remove(category);
    }

    async preventDuplicate(name: string) {
        const category = await this.findByName(name);
        if (category) {
            throw new ConflictException('category.duplicate-entity');
        }
    }
}
