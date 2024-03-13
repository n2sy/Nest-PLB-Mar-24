import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from './generics/roleEnum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async inscription(credentials) {
    let newUser = this.userRepo.create({
      username: credentials.username,
      email: credentials.email,
      salt: await bcrypt.genSalt(),
      //role: RoleEnum.ROLE_USER,
    });
    this.userRepo.save(credentials);
  }
}
