import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaperConf } from './paper_conf.model';

@Injectable()
export class PaperConfRepository {
  constructor(
    @InjectModel(PaperConf)
    private readonly paperConfModel: typeof PaperConf,
  ) {}

  async create(data: Partial<PaperConf>): Promise<PaperConf> {
    return this.paperConfModel.create(data as any);
  }

  async findAll(): Promise<PaperConf[]> {
    return this.paperConfModel.findAll();
  }

  async findById(id: number): Promise<PaperConf | null> {
    return this.paperConfModel.findByPk(id);
  }

  async update(
    id: number,
    data: Partial<PaperConf>,
  ): Promise<[number, PaperConf[]]> {
    return this.paperConfModel.update(data, { where: { id }, returning: true });
  }

  async delete(id: number): Promise<number> {
    return this.paperConfModel.destroy({ where: { id } });
  }
}
