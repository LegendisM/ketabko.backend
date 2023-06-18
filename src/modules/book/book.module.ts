import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { BookSection } from './entity/book-section.entity';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, BookSection]),
    StorageModule
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService]
})
export class BookModule { }
