import _ from 'lodash';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { IPagination } from './../../common/interface/pagination.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindCategoriesDto } from './dto/find-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DatabaseSource } from 'src/database/interface/database.interface';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity, DatabaseSource.Primary) private categoryRepository: Repository<CategoryEntity>
    ) { }

    async create(createDto: CreateCategoryDto): Promise<CategoryEntity> {
        await this.preventDuplicate(createDto.name);
        const category = this.categoryRepository.create(createDto);
        return await this.categoryRepository.save(category);
    }

    async findAll({ name, limit, page }: FindCategoriesDto, mergeCondition: boolean = false): Promise<IPagination<CategoryEntity>> {
        let where: FindOptionsWhere<CategoryEntity>[] = [
            (name) ?
                { name: Like(`%${name}%`) }
                : null
        ].filter(condition => !!condition);
        where = mergeCondition ? [_.reduce(where, (previous, current) => _.merge(previous, current))] : where;
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

    async findById(id: string, exception: boolean = false): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOneBy({ id });
        if (exception && !category) {
            throw new NotFoundException('category.invalid-id');
        }
        return category;
    }

    async findByName(name: string, exception: boolean = false): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOneBy({ name });
        if (exception && !category) {
            throw new NotFoundException('category.invalid-name');
        }
        return category;
    }

    async update(id: string, updateDto: UpdateCategoryDto): Promise<CategoryEntity> {
        const category = await this.findById(id, true);
        Object.assign(category, updateDto);
        return await this.categoryRepository.save(category);
    }

    async remove(id: string): Promise<CategoryEntity> {
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
