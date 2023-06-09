import { Injectable, NotFoundException } from '@nestjs/common';
import { BookService } from '../book/book.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentableType } from './interface/comment.interface';
import { IPagination } from 'src/common/interface/pagination.interface';
import { FindCommentsDto } from './dto/find-comment.dto';
import { User } from '../user/entity/user.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
        private bookService: BookService
    ) { }

    async create({ title, message, entityType, entityId }: CreateCommentDto, user: User): Promise<Comment> {
        await this.validateEntity(entityType, entityId, true);
        const comment = this.commentRepository.create({ title, message, entityType, entityId, user });
        return await this.commentRepository.save(comment);
    }

    async findAll({ entityType, entityId, user, limit, page }: FindCommentsDto): Promise<IPagination<Comment>> {
        const comments = await this.commentRepository.find({
            where: [
                (entityType) ?
                    { entityType }
                    : null,
                (entityId) ?
                    { entityId }
                    : null,
                (user) ?
                    { user: { id: user } }
                    : null
            ],
            skip: (page - 1) * limit,
            take: limit - 1
        });
        const commentsCount = await this.commentRepository.count();
        return {
            items: comments,
            limit: limit,
            page: page,
            total: Math.ceil(commentsCount / limit)
        }
    }

    async findById(id: string, exception: boolean = false): Promise<Comment> {
        const comment = await this.commentRepository.findOneBy({ id });
        if (exception && !comment) {
            throw new NotFoundException('comment.invalid-id');
        }
        return comment;
    }

    async remove(id: string): Promise<Comment> {
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