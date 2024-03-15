import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class TaskDTO {
  @ApiProperty({
    description: 'Le titre de la tâche à ajouter',
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Le titre doit depasser 5 caractères',
  })
  title; //: string;

  @ApiProperty({
    description: "L'année de la tâche",
    default: '2024',
  })
  @IsNotEmpty()
  @Min(2000)
  @Max(2030)
  year: number;

  @ApiProperty({
    description: 'Le statut de la tâche',
    default: 'todo',
  })
  @IsIn(['todo', 'in progress'])
  statut: string;
}
