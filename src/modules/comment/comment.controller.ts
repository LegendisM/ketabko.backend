import { Controller, Get, Post, Delete, Query, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { FindCommentsDto } from './dto/find-comment.dto';
import { IPagination } from './../../common/interface/pagination.interface';
import { CommentEntity } from './entity/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CurrentUser } from '../user/decorator/user.decorator';
import { UserEntity } from '../user/entity/user.entity';
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
    @ApiOkResponse({
        description: 'Receive Array Of Comments With Paginate'
    })
    async getComments(@Query() findDto: FindCommentsDto): Promise<IPagination<CommentEntity>> {
        return await this.commentService.findAll(findDto);
    }

    @Get('/:id')
    @ApiOkResponse({
        description: 'Receive Comment Instance'
    })
    @ApiNotFoundResponse({
        description: 'Comment Not Found'
    })
    async getCommentById(@Param('id', ParseUUIDPipe) id: string): Promise<CommentEntity> {
        return await this.commentService.findById(id, true);
    }

    @Post('/')
    @Auth()
    @ApiOkResponse({
        description: 'Comment Created Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Entity Not Found'
    })
    async createComment(
        @Body() createDto: CreateCommentDto,
        @CurrentUser() user: UserEntity
    ): Promise<CommentEntity> {
        return await this.commentService.create(createDto, user);
    }

    @Delete('/:id')
    @Auth()
    @ApiOkResponse({
        description: 'Comment Removed Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Comment Not Found'
    })
    @ApiForbiddenResponse({
        description: 'Invalid User Policy Access'
    })
    async removeComment(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: UserEntity) {
        const comment = await this.commentService.findById(id, true);
        this.policyService.forComment(PolicyAction.Delete, user, comment, true);
        return await this.commentService.remove(id);
    }
}
