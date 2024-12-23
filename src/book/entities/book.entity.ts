import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from '../generics/timestamp';

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

  // @ManyToOne(() => AuthorEntity, (author) => author.id, {
  //   // lazy: true,
  //   //eager: true,
  //   //cascade: true,
  // })
  // author: AuthorEntity;

  // @ManyToOne(() => UserEntity, (user) => user.id)
  // user: UserEntity;
}
