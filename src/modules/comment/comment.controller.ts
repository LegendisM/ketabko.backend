import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller({
    path: 'comments',
    version: '1'
})
export class CommentController { }
