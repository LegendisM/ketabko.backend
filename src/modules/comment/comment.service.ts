import { Injectable, NotFoundException } from '@nestjs/common';
import { BookService } from '../book/service/book.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entity/comment.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentableType } from './interface/comment.interface';
import { IPagination } from './../../common/interface/pagination.interface';
import { FindCommentsDto } from './dto/find-comment.dto';
import { UserEntity } from '../user/entity/user.entity';
import _ from 'lodash';
import { DatabaseSource } from 'src/database/interface/database.interface';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity, DatabaseSource.Primary) private commentRepository: Repository<CommentEntity>,
        private bookService: BookService
    ) { }

    async create({ title, message, entityType, entityId }: CreateCommentDto, user: UserEntity): Promise<CommentEntity> {
        await this.validateEntity(entityType, entityId, true);
        const comment = this.commentRepository.create({ title, message, entityType, entityId, user });
        return await this.commentRepository.save(comment);
    }

    async findAll({ entityType, entityId, user, limit, page }: FindCommentsDto, mergeCondition: boolean = false): Promise<IPagination<CommentEntity>> {
        let where: FindOptionsWhere<CommentEntity>[] = [
            (entityType) ?
                { entityType }
                : null,
            (entityId) ?
                { entityId }
                : null,
            (user) ?
                { user: { id: user } }
                : null
        ].filter(condition => !!condition);
        where = mergeCondition ? [_.reduce(where, (previous, current) => _.merge(previous, current))] : where;
        const comments = await this.commentRepository.find({
            where: where,
            skip: (page - 1) * limit,
            take: limit - 1
        });
        const commentsCount = await this.commentRepository.count({ where });
        return {
            items: comments,
            limit: limit,
            page: page,
            total: Math.ceil(commentsCount / limit)
        }
    }

    async findById(id: string, exception: boolean = false): Promise<CommentEntity> {
        const comment = await this.commentRepository.findOneBy({ id });
        if (exception && !comment) {
            throw new NotFoundException('comment.invalid-id');
        }
        return comment;
    }

    async remove(id: string): Promise<CommentEntity> {
        const comment = await this.findById(id, true);
        return this.commentRepository.remove(comment);
    }

    async validateEntity(entityType: CommentableType, entityId: string, exception: boolean = false): Promise<unknown> {
        let entity;
        switch (entityType) {
            case CommentableType.Book:
                entity = await this.bookService.findById(entityId);
                break;
        }
        if (exception && !entity) {
            throw new NotFoundException('comment.invalid-entity');
        }
        return entity;
    }
}