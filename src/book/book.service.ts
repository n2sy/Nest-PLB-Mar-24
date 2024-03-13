import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { BookDTO } from './DTO/bookdto';
import { GenericService } from './generic.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity) private bookRepo: Repository<BookEntity>,
    private genericSer: GenericService,
  ) {}

  chercherTousLesLivres() {
    return this.genericSer.findAll(this.bookRepo);
    // return this.bookRepo.find({
    //   withDeleted: true,
    //   //   select: {
    //   //     editor: true,
    //   //     year: true,
    //   //   },
    // });
  }

  ajouterLivre(newBook: BookDTO) {
    return this.genericSer.ajouterEntity(newBook, this.bookRepo);
  }

  async editerLivre(uBook: BookDTO, id) {
    return this.genericSer.editerEntity(uBook, id, this.bookRepo);
  }

  chercherLivreParId(id) {
    return this.genericSer.findById(id, this.bookRepo);
  }

  softsupprimerLivre(id) {
    return this.genericSer.softsupprimerEntity(id, this.bookRepo);
  }

  restaurerLivre(id) {
    this.genericSer.restaurerEntity(id, this.bookRepo);
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

  async softsupprimerLivreV2(id) {
    let res = await this.bookRepo.findOneBy({ id: id });
    if (!res) throw new NotFoundException();
    return this.bookRepo.softRemove(res);
  }

  async recoverLivre(id) {
    let res = await this.bookRepo.find({
      where: {
        id: id,
      },
      withDeleted: true,
    });
    if (!res) throw new NotFoundException();
    return this.bookRepo.recover(res);
  }

  nbreLivresParAnnee() {
    const qb = this.bookRepo.createQueryBuilder('book');
    return (
      qb
        .select('book.year, count(book.id) as nbreDeLivres')
        .groupBy('book.year')
        // .getSql()
        .getRawMany()
    );
  }

  nbreLivresEntreDeuxAnnees(y1, y2) {
    const qb = this.bookRepo.createQueryBuilder('book');
    return (
      qb
        .select('book.year, count(book.id) as nbreDeLivres')
        .where('book.year >= :year1 AND book.year <= :year2')
        .setParameters({ year1: y1, year2: y2 })
        .groupBy('book.year')
        // .getSql()
        .getRawMany()
    );
  }
}
