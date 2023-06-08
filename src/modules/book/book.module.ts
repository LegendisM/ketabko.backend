import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService]
})
export class BookModule { }
