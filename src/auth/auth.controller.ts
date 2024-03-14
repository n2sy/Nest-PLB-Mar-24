import {
  Body,
  ConflictException,
  Controller,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authSer: AuthService) {}

  @Post('register')
  async signup(@Body() credentials, @Res() response: Response) {
    try {
      let result = await this.authSer.inscription(credentials);
      return response.json({ message: 'Utilisateur inscrit', result });
    } catch (err) {
      throw new ConflictException('Username ou Email existant');
    }
  }

  @Post('login')
  async signin(@Body() credentials, @Res() response: Response) {
    let result = await this.authSer.seConnecter(credentials);
    return response.json({
      message: 'Utilisateur connecté',
      access_token: result['access_token'],
    });
  }

  @Post('forgot-pwd')
  async forgotPassword(@Body('login') login, @Res() response: Response) {
    console.log('login', login);

    try {
      let result = await this.authSer.oublierMotDePasse(login);
      return response.json(result);
    } catch (err) {
      throw new ConflictException();
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Query('token') token,
    @Body('password') pwd,
    @Res() response: Response,
  ) {
    try {
      let result = await this.authSer.reinitialiserMotDePasse(token, pwd);
      return response.json(result);
    } catch (err) {
      throw new ConflictException();
    }
  }
}
