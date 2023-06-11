import _ from 'lodash';
import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageFile } from './entity/storage-file.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateFileName } from 'src/common/helper/text.helper';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([StorageFile]),
    MulterModule.register({
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          const extension = extname(file.originalname);
          const filename = generateFileName(extension);
          cb(null, filename);
        },
      })
    })
  ],
  providers: [StorageService],
  controllers: [StorageController],
  exports: [StorageService]
})
export class StorageModule { }
