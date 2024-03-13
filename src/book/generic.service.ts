import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GenericService {
  constructor() {} // @InjectRepository(AuthorEntity) private authRepo, // @InjectRepository(BookEntity) private bookRepo,

  findAll(repo) {
    return repo.find();
  }

  findById(id, repo) {
    return repo.findOneByOrFail({
      id: id,
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
