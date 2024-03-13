import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from '../generics/timestamp';
import { AuthorEntity } from './author.entity';

@Entity('livre')
export class BookEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    // name : 'titre',
    length: 50,
    // update : false,
    // unique : true,
    // type : ''
  })
  title: string;

  @Column()
  editor: string;

  @Column({
    type: 'int',
  })
  year: number;

  @ManyToOne(() => AuthorEntity, (author) => author.listeLivres, {
    // lazy: true,
    //eager: true,
    cascade: true,
  })
  author: AuthorEntity;
}
