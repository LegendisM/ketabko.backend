import { Controller, Get, Post, Delete, Query, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { FindCommentsDto } from './dto/find-comment.dto';
import { IPagination } from 'src/common/interface/pagination.interface';
import { Comment } from './entity/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CurrentUser } from '../user/decorator/user.decorator';
import { User } from '../user/entity/user.entity';
import { PolicyService } from '../policy/policy.service';
import { PolicyAction } from '../policy/interface/policy.interface';
import { Auth } from '../auth/decorator/auth.decorator';

@ApiTags('Comments')
@Controller({
    path: '/comments',
    version: '1'
})
export class CommentController {
    constructor(
        private commentService: CommentService,
        private policyService: PolicyService
    ) { }

    @Get('/')
    async getComments(@Query() findDto: FindCommentsDto): Promise<IPagination<Comment>> {
        return await this.commentService.findAll(findDto);
    }

    @Get('/:id')
    async getCommentById(@Param('id') id: string): Promise<Comment> {
        return await this.commentService.findById(id, true);
    }

    @Post('/')
    @Auth()
    async createComment(
        @Body() createDto: CreateCommentDto,
        @CurrentUser() user: User
    ): Promise<Comment> {
        return await this.commentService.create(createDto, user);
    }

    @Delete('/:id')
    @Auth()
    async removeComment(@Param('id') id: string, @CurrentUser() user: User) {
        const comment = await this.commentService.findById(id, true);
        this.policyService.forComment(PolicyAction.Delete, user, comment, true);
        return await this.commentService.remove(id);
    }
}
