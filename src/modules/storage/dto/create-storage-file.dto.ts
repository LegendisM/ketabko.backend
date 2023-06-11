import { ApiProperty, PickType } from "@nestjs/swagger";
import { BaseStorageFileDto } from "./base-storage-file.dto";

export class CreateStorageFileDto extends PickType(
    BaseStorageFileDto,
    ['name', 'detail', 'type']
) { }