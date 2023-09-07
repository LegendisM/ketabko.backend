import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entity/comment.entity';
import { BookModule } from '../book/book.module';
import { DatabaseSource } from 'src/database/interface/database.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity], DatabaseSource.Primary),
    BookModule
  ],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule { }
