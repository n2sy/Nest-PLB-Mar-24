import { Body, ConflictException, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

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
}
