import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Conferencia } from './conferencia.model';

type ConferenciaCreationAttrs = {
  titulo: string;
  url?: string;
  data?: Date;
  deletado_em?: Date;
};
@Injectable()
export class ConferenciaRepository {
  constructor(
    @InjectModel(Conferencia)
    private readonly conferenciaModel: typeof Conferencia,
  ) {}

  async create(input: Partial<Conferencia>): Promise<Conferencia> {
    // Garante apenas os campos válidos e tipados
    const dataToCreate: ConferenciaCreationAttrs = {
      titulo: input.titulo!,
    };
    if (input.url !== undefined) dataToCreate.url = input.url;
    if (input.data !== undefined) dataToCreate.data = input.data;
    if (input.deletado_em !== undefined)
      dataToCreate.deletado_em = input.deletado_em;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.conferenciaModel.create(dataToCreate as any);
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
