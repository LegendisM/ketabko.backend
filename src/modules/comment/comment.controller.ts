import { Controller, Get, Post, Delete, Query, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { FindCommentsDto } from './dto/find-comment.dto';
import { IPagination } from 'src/common/interface/pagination.interface';
import { Comment } from './entity/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CurrentUser } from '../user/decorator/user.decorator';
import { User } from '../user/entity/user.entity';

@ApiTags('Comments')
@Controller({
    path: '/comments',
    version: '1'
})
export class CommentController {
    constructor(
        private commentService: CommentService
    ) { }

    @Get('/')
    async getComments(@Query() findDto: FindCommentsDto): Promise<IPagination<Comment>> {
        return await this.commentService.findAll(findDto);
    }

    @Post('/')
    async createComment(
        @Body() createDto: CreateCommentDto,
        @CurrentUser() user: User
    ): Promise<Comment> {
        return await this.commentService.create(createDto, user);
    }

    @Delete('/:id')
    async removeComment(@Param('id') id: string) {
        return await this.commentService.remove(id);
    }
}
