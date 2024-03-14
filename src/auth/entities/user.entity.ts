import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from '../generics/roleEnum';
import { Timestamp } from 'src/book/generics/timestamp';

@Entity('users')
export class UserEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  username;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.ROLE_USER,
  })
  role: string;
}
