import { Module } from '@nestjs/common';
import { BookController } from './controller/book.controller';
import { BookService } from './service/book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { BookSection } from './entity/book-section.entity';
import { StorageModule } from '../storage/storage.module';
import { BookSectionData } from './entity/book-section-data.entity';
import { BookSectionService } from './service/book-section.service';
import { BookSectionDataService } from './service/book-section-data.service';
import { BookSectionController } from './controller/book-section.controller';
import { BookSectionDataController } from './controller/book-section-data.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, BookSection, BookSectionData]),
    StorageModule
  ],
  controllers: [BookController, BookSectionController, BookSectionDataController],
  providers: [BookService, BookSectionService, BookSectionDataService],
  exports: [BookService, BookSectionService, BookSectionDataService]
})
export class BookModule { }
