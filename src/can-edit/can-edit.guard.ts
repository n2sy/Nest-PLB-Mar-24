import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/auth/generics/roleEnum';
import { BookService } from 'src/book/book.service';

@Injectable()
export class CanEditGuard implements CanActivate {
  constructor(private bookSer: BookService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let req = context.switchToHttp().getRequest();

    return this.bookSer.chercherLivreParId(req.params.id).then((livre) => {
      console.log(livre[0].user, req.user.id);

      if (
        livre[0].user == Number(req.user.id) ||
        req.user.role == RoleEnum.ROLE_ADMIN
      )
        return true;
      return false;
    });
  }
}
