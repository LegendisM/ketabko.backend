import { ArgumentMetadata, Injectable, ParseFilePipe, PipeTransform, MaxFileSizeValidator, FileTypeValidator } from "@nestjs/common";
import { STORAGE_MAX_FILE_UPLOAD_SIZE, STORAGE_FILE_MIME_TYPES } from "../constant/storage.constant";

@Injectable()
export class ParseStorageFilePipe implements PipeTransform {
    constructor(
        private required: boolean = true
    ) { }

    async transform(value: any, metadata: ArgumentMetadata) {
        return await new ParseFilePipe({
            fileIsRequired: this.required,
            validators: [
                new MaxFileSizeValidator({ maxSize: STORAGE_MAX_FILE_UPLOAD_SIZE }),
                new FileTypeValidator({ fileType: `.(${STORAGE_FILE_MIME_TYPES.join('|')})` })
            ]
        }).transform(value);
    }
}