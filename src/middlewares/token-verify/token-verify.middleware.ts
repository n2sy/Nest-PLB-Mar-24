import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenVerifyMiddleware implements NestMiddleware {
  constructor(
    private jwtSer: JwtService,
    private configSer: ConfigService,
  ) {}
  use(req: any, res: any, next: () => void) {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = this.jwtSer.verify(token, {
        secret: 'supersecretcode',
      });
      if (!decodedToken) {
        throw new UnauthorizedException('Token expiré');
      }
      next();
    } catch (err) {
      throw new UnauthorizedException('Token invalide');
    }
  }
}
