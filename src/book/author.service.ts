import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from './entities/author.entity';
import { GenericService } from './generic.service';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorRepo: Repository<AuthorEntity>,
    private genericSer: GenericService,
  ) {}

  chercherTousLesAuteurs() {
    return this.genericSer.findAll(this.authorRepo);
  }

  chercherAuteurById(id) {
    return this.genericSer.findById(id, this.authorRepo);
  }

  ajouterAuteur(newAuteur) {
    return this.genericSer.ajouterEntity(newAuteur, this.authorRepo);
  }

  editerAuteur(uAuteur, id) {
    return this.genericSer.editerEntity(uAuteur, id, this.authorRepo);
  }

  supprimerAuteur(id) {
    return this.genericSer.softsupprimerEntity(id, this.authorRepo);
  }
  restaurerAuteur(id) {
    return this.genericSer.restaurerEntity(id, this.authorRepo);
  }
}
