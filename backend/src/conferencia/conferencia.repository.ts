import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Conferencia } from './conferencia.model';

@Injectable()
export class ConferenciaRepository {
  constructor(
    @InjectModel(Conferencia)
    private readonly conferenciaModel: typeof Conferencia,
  ) {}

  async create(input: Partial<Conferencia>): Promise<Conferencia> {
    // Garante apenas os campos válidos
    const dataToCreate: any = {};
    if (input.titulo !== undefined) dataToCreate.titulo = input.titulo;
    if (input.url !== undefined) dataToCreate.url = input.url;
    if (input.data !== undefined) dataToCreate.data = input.data;
    if (input.deletado_em !== undefined)
      dataToCreate.deletado_em = input.deletado_em;
    return this.conferenciaModel.create(dataToCreate);
  }

  async findAll(): Promise<Conferencia[]> {
    return this.conferenciaModel.findAll();
  }

  async findById(id: number): Promise<Conferencia | null> {
    return this.conferenciaModel.findByPk(id);
  }

  async update(
    id: number,
    data: Partial<Conferencia>,
  ): Promise<[number, Conferencia[]]> {
    // Garante apenas os campos válidos
    const { titulo, url, data: dataField, deletado_em } = data;
    return this.conferenciaModel.update(
      {
        titulo,
        url,
        data: dataField,
        deletado_em,
      },
      { where: { id }, returning: true },
    );
  }

  async delete(id: number): Promise<number> {
    return this.conferenciaModel.destroy({ where: { id } });
  }
}
