import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from '../generics/roleEnum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
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
