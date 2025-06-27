import { Injectable } from '@nestjs/common';
import { ConferenciaRepository } from './conferencia.repository';
import { Conferencia } from './conferencia.model';

@Injectable()
export class ConferenciaService {
  constructor(private readonly conferenciaRepository: ConferenciaRepository) {}

  create(data: Partial<Conferencia>) {
    return this.conferenciaRepository.create(data);
  }

  findAll() {
    return this.conferenciaRepository.findAll();
  }

  findById(id: number) {
    return this.conferenciaRepository.findById(id);
  }

  update(id: number, data: Partial<Conferencia>) {
    return this.conferenciaRepository.update(id, data);
  }

  delete(id: number) {
    return this.conferenciaRepository.delete(id);
  }
}
