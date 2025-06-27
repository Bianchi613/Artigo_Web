import { Injectable, NotFoundException } from '@nestjs/common';
import { PaperRepository } from './paper.repository';
import { Paper } from './paper.model';

@Injectable()
export class PaperService {
  constructor(private readonly paperRepository: PaperRepository) {}

  async findAll(): Promise<Paper[]> {
    return this.paperRepository.findAll();
  }

  async findById(id: number): Promise<Paper> {
    const paper = await this.paperRepository.findById(id);
    if (!paper) throw new NotFoundException('Paper não encontrado');
    return paper;
  }

  async create(
    data: Partial<Paper>,
    autoresIds: number[] = [],
  ): Promise<Paper> {
    return this.paperRepository.create(data, autoresIds);
  }

  async update(
    id: number,
    data: Partial<Paper>,
    autoresIds?: number[],
  ): Promise<Paper> {
    const paper = await this.paperRepository.update(id, data, autoresIds);
    if (!paper) throw new NotFoundException('Paper não encontrado');
    return paper;
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.paperRepository.delete(id);
    if (!deleted) throw new NotFoundException('Paper não encontrado');
  }
}
