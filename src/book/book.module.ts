import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { AuthorEntity } from './entities/author.entity';
import { GenericService } from './generic.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity])],
  controllers: [BookController, AuthorController],
  providers: [BookService, AuthorService, GenericService],
})
export class BookModule {}
