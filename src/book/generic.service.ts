import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class GenericService {
  constructor() {} // @InjectRepository(AuthorEntity) private authRepo, // @InjectRepository(BookEntity) private bookRepo,

  findAll(repo: Repository<any>) {
    return repo.find({
      loadRelationIds: true,
      //   relations: {
      //     listeLivres: true,
      //     author: true,
      //   },
    });
  }

  findById(id, repo) {
    // return repo.findOneByOrFail({
    //   id: id,
    // });
    return repo.find({
      loadRelationIds: true,
      where: {
        id: id,
      },
    });
  }

  ajouterEntity(newEntity, repo) {
    return repo.save(newEntity);
  }

  async editerEntity(uEntity, id, repo) {
    let b = await repo.preload({
      id: id,
      ...uEntity,
    });
    if (!b)
      throw new NotFoundException("La ressource à mettre à jour n'existe pas");
    return repo.save(b);
  }

  softsupprimerEntity(id, repo) {
    return repo.softDelete({ id: id });
  }

  restaurerEntity(id, repo) {
    return repo.restore(id);
  }
}
