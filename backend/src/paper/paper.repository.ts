import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Paper } from './paper.model';
import { Usuario } from '../usuario/usuario.model';

@Injectable()
export class PaperRepository {
  constructor(
    @InjectModel(Paper)
    private readonly paperModel: typeof Paper,
  ) {}

  async findAll(): Promise<Paper[]> {
    return this.paperModel.findAll({ include: [Usuario] });
  }

  async findById(id: number): Promise<Paper | null> {
    return this.paperModel.findByPk(id, { include: [Usuario] });
  }

  async create(
    data: Partial<Paper>,
    autoresIds: number[] = [],
  ): Promise<Paper> {
    const paper = await this.paperModel.create(data as any);
    if (autoresIds.length > 0) {
      await paper.$set('autores', autoresIds);
    }
    return this.findById(paper.id) as Promise<Paper>;
  }

  async update(
    id: number,
    data: Partial<Paper>,
    autoresIds?: number[],
  ): Promise<Paper | null> {
    const paper = await this.findById(id);
    if (!paper) return null;
    await paper.update(data);
    if (autoresIds) {
      await paper.$set('autores', autoresIds);
    }
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const paper = await this.findById(id);
    if (!paper) return false;
    await paper.destroy();
    return true;
  }
}
