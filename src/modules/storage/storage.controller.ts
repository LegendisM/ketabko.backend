import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Storages')
@Controller({
    path: '/storages',
    version: '1'
})
export class StorageController { }
