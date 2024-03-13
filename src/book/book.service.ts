import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { BookDTO } from './DTO/bookdto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity) private bookRepo: Repository<BookEntity>,
  ) {}

  chercherTousLesLivres() {
    return this.bookRepo.find({
      //   select: {
      //     editor: true,
      //     year: true,
      //   },
    });
  }

  ajouterLivre(newBook: BookDTO) {
    return this.bookRepo.save(newBook);
  }

  async editerLivre(uBook: BookDTO, id) {
    let b = await this.bookRepo.preload({
      id: id,
      ...uBook,
    });
    if (!b)
      throw new NotFoundException("Le livre à mettre à jour n'existe pas");
    return this.bookRepo.save(b);
  }

  chercherLivreParId(id) {
    return this.bookRepo.findOneByOrFail({
      id: id,
    });
  }

  //   supprimerLivre(annee) {
  //     return this.bookRepo.delete({
  //       year: annee,
  //     });
  //   }
  supprimerLivre(id) {
    return this.bookRepo.delete({
      id: id,
      //   year : 2023,
      //   editor : 'florian',
      //   createdAt : new Date(2024,3,2)
    });
  }

  async supprimerLivreV2(id) {
    let res = await this.bookRepo.findOneBy({ id: id });
    if (!res) throw new NotFoundException();
    return this.bookRepo.remove(res);
  }

  softsupprimerLivre(id) {
    return this.bookRepo.softDelete({ id: id });
  }

  restaurerLivre(id) {
    this.bookRepo.restore(id);
  }
}
