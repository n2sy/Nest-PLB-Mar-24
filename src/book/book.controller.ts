import { ConflictException, Controller, Get, Res } from '@nestjs/common';
import { BookService } from './book.service';
import { Response } from 'express';

@Controller('book')
export class BookController {
  constructor(private bookSer: BookService) {}

  @Get('all')
  async getAllBooks(@Res() response: Response) {
    // V1 avec then et catch
    // this.bookSer
    //   .chercherTousLesLivres()
    //   .then((result) => {
    //     response.json(result);
    //   })
    //   .catch((err) => {
    //     throw new ConflictException();
    //   });

    //V2 avec async / await
    try {
      let result = await this.bookSer.chercherTousLesLivres();
      return response.json(result);
    } catch (err) {
      throw new ConflictException();
    }
  }
}
