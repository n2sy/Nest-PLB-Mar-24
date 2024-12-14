import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from '../generics/timestamp';
import { BookEntity } from './book.entity';

@Entity('auteurs')
export class AuthorEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  prenom: string;

  @Column()
  nom: string;

  @OneToMany(() => BookEntity, (book) => book.id, {
    //eager: true,
  })
  listeLivres: BookEntity[];
}
