import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { CategoryEntity } from './entity/category.entity';
import { DatabaseSource } from 'src/database/interface/database.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity], DatabaseSource.Primary),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule { }
