import {
  IsIn,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class TaskDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Le titre doit depasser 5 caractères',
  })
  title; //: string;

  @IsNotEmpty()
  @Min(2000)
  @Max(2020)
  year: number;

  @IsIn(['todo', 'in progress'])
  statut: string;
}
