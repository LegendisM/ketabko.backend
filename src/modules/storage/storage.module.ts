import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageFile } from './entity/storage-file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StorageFile])
  ],
  providers: [StorageService],
  controllers: [StorageController],
  exports: [StorageService]
})
export class StorageModule { }
