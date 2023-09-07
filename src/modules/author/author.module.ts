import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entity/author.entity';
import { StorageModule } from '../storage/storage.module';
import { DatabaseSource } from 'src/database/interface/database.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorEntity], DatabaseSource.Primary),
    StorageModule
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [AuthorService]
})
export class AuthorModule { }
