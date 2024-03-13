import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Response } from 'express';
import { BookDTO } from './DTO/bookdto';

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

  @Post('add')
  async addBook(@Body() book: BookDTO, @Res() response: Response) {
    try {
      let result = await this.bookSer.ajouterLivre(book);
      return response.json({ message: 'Livre ajouté', result });
    } catch (err) {
      throw new ConflictException();
    }
  }

  //   @Get('all/:id')
  //   async getBookById(@Param('id') id: number, @Res() response: Response) {

  //       let result = await this.bookSer.chercherLivreParId(id); // Appel à FindOneBy et non FindoneByOrFail
  //       if(!result) throw new NotFoundException();
  //       return response.json(result);

  //   }

  @Get('all/:id')
  async getBookById(@Param('id') id: number, @Res() response: Response) {
    try {
      let result = await this.bookSer.chercherLivreParId(id);
      return response.json(result);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Put('edit/:id')
  async updateBook(
    @Param('id', ParseIntPipe) bookId,
    @Body() uBook,
    @Res() response: Response,
  ) {
    let result = await this.bookSer.editerLivre(uBook, bookId);
    return response.json({ message: 'Livre mise à jour', result });
  }

  //   @Delete('del/:annee')
  //   async deleteBook(
  //     @Param('annee', ParseIntPipe) annee,
  //     @Res() response: Response,
  //   ) {
  //     try {
  //       let res = await this.bookSer.supprimerLivre(annee);
  //       return response.json(res);
  //     } catch (err) {
  //       throw new NotFoundException();
  //     }
  //   }
  @Delete('del/:id')
  async deleteBook(@Param('id', ParseIntPipe) id, @Res() response: Response) {
    let res = await this.bookSer.supprimerLivre(id);
    console.log(res);

    if (!res.affected) throw new NotFoundException();
    return response.json({ message: 'Livre supprimé', id });
  }

  @Delete('softdel/:id')
  async softDeleteBook(
    @Param('id', ParseIntPipe) id,
    @Res() response: Response,
  ) {
    let res = await this.bookSer.softsupprimerLivre(id);
    console.log(res);

    if (!res.affected) throw new NotFoundException();
    return response.json({ message: 'Livre (soft) supprimé', id });
  }

  @Put('restore/:id')
  async restoreBook(@Param('id', ParseIntPipe) id, @Res() response: Response) {
    let res = await this.bookSer.restaurerLivre(id);
    return response.json({ message: 'Livre restauré', id, res });
  }
  @Delete('remove/:id')
  async removeBook(@Param('id', ParseIntPipe) id, @Res() response: Response) {
    let res = await this.bookSer.supprimerLivreV2(id);
    return response.json({ message: 'Livre supprimé', res });
  }
}
