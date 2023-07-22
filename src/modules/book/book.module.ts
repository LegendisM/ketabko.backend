import { Module } from '@nestjs/common';
import { BookController } from './controller/book.controller';
import { BookService } from './service/book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { BookSection } from './entity/book-section.entity';
import { StorageModule } from '../storage/storage.module';
import { BookSectionDocument } from './entity/book-section-document.entity';
import { BookSectionService } from './service/book-section.service';
import { BookSectionDocumentService } from './service/book-section-document.service';
import { BookSectionController } from './controller/book-section.controller';
import { BookSectionDocumentController } from './controller/book-section-document.controller';
import { AuthorModule } from '../author/author.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, BookSection, BookSectionDocument]),
    StorageModule,
    AuthorModule
  ],
  controllers: [BookController, BookSectionController, BookSectionDocumentController],
  providers: [BookService, BookSectionService, BookSectionDocumentService],
  exports: [BookService, BookSectionService, BookSectionDocumentService]
})
export class BookModule { }
