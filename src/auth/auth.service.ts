import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtSer: JwtService,
    private mailerSer: MailerService,
  ) {}

  async inscription(credentials) {
    let newUser = this.userRepo.create({
      username: credentials.username,
      email: credentials.email,
      salt: await bcrypt.genSalt(),
      //role: RoleEnum.ROLE_USER,
    });
    newUser.password = await bcrypt.hash(credentials.password, newUser.salt);
    return this.userRepo.save(newUser);
  }

  async seConnecter(crendentials) {
    // let identfiant = crendentials.identifiant;
    // let password = crendentials.password;
    const { identifiant, password } = crendentials;
    const qb = this.userRepo.createQueryBuilder('user');
    let user = await qb
      .select('user')
      .where('user.username = :ident OR user.email = :ident')
      .setParameter('ident', identifiant)
      .getOne();

    if (!user) throw new NotFoundException('Username ou Email inexistant');
    else {
      let result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = this.jwtSer.sign({
          id: user.id,
          // identifiant: identifiant,
          // role: user.role,
        });
        return {
          identifiant,
          access_token: token,
        };
      } else throw new NotFoundException('Mot de passe invalide');
    }
  }

  oublierMotDePasse(login) {
    const generatedToken = this.jwtSer.sign({
      identifiant: login,
    });

    console.log(generatedToken);

    return this.mailerSer.sendMail({
      to: login,
      subject: 'Reinitialisation de mot de passe',
      //html: '<h2>Bonjour </h2>',
      template: './forgot-pwd.hbs',
      context: { token: generatedToken },
    });
  }

  async reinitialiserMotDePasse(token, newPwd) {
    const decodedToken = this.jwtSer.verify(token);
    if (!decodedToken) throw new UnauthorizedException('Token non valide');
    let user = await this.userRepo.findOne({
      where: {
        email: decodedToken.identifiant,
      },
    });

    console.log(user);
    let hashedNewPwd = await bcrypt.hash(newPwd, user['salt']);

    let u = await this.userRepo.preload({
      ...user,
      password: hashedNewPwd,
    });

    return this.userRepo.save(u);
  }
}
