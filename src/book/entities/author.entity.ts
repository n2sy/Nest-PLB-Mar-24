import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from '../generics/timestamp';

@Entity('auteurs')
export class AuthorEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  prenom: string;

  @Column()
  nom: string;
}
