import {
  Body,
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
import { AuthorService } from './author.service';
import { Response } from 'express';

@Controller('authors')
export class AuthorController {
  constructor(private authorSer: AuthorService) {}

  @Get('all')
  async getAllAuthors(@Res() response: Response) {
    let res = await this.authorSer.chercherTousLesAuteurs();
    return response.json(res);
  }

  @Get('all/:id')
  async getAuthorById(@Param('id') id, @Res() response: Response) {
    try {
      let result = await this.authorSer.chercherAuteurById(id);
      return response.json(result);
    } catch (err) {
      throw new NotFoundException("L'auteur recherché n'existe pas");
    }
  }

  @Post('add')
  async addAuthor(@Body() body, @Res() response: Response) {
    let result = await this.authorSer.ajouterAuteur(body);
    return response.json(result);
  }

  @Put('edit/:id')
  async editAuthor(
    @Param('id', ParseIntPipe) id,
    @Body() body,
    @Res() response: Response,
  ) {
    let result = await this.authorSer.editerAuteur(body, id);
    return response.json(result);
  }

  @Delete('delete/:id')
  async deleteAuthor(@Param('id') id, @Res() response: Response) {
    let res = await this.authorSer.supprimerAuteur(id);
    if (!res.affected) throw new NotFoundException();
    return response.json(res);
  }

  @Put('restore/:id')
  async restoreAuthor(@Param('id') id, @Res() response: Response) {
    let res = await this.authorSer.restaurerAuteur(id);
    return response.json({ message: 'Author restauré', res });
  }
}
