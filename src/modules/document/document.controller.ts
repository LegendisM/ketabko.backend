import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Documents')
@Controller({
    path: 'documents',
    version: '1'
})
export class DocumentController { }
