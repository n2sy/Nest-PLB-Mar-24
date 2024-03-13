import { IsNotEmpty, IsPositive, MinLength } from 'class-validator';

export class BookDTO {
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @IsNotEmpty()
  @MinLength(5)
  editor: string;

  @IsPositive()
  year: number;

  @IsNotEmpty()
  author;
}
