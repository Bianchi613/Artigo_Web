import { Injectable } from '@nestjs/common';
import { PaperConfRepository } from './paper_conf.repository';
import { PaperConf } from './paper_conf.model';

@Injectable()
export class PaperConfService {
  constructor(private readonly paperConfRepository: PaperConfRepository) {}

  create(data: Partial<PaperConf>) {
    return this.paperConfRepository.create(data);
  }

  findAll() {
    return this.paperConfRepository.findAll();
  }

  findById(id: number) {
    return this.paperConfRepository.findById(id);
  }

  update(id: number, data: Partial<PaperConf>) {
    return this.paperConfRepository.update(id, data);
  }

  delete(id: number) {
    return this.paperConfRepository.delete(id);
  }
}
