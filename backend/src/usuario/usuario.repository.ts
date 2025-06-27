import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './usuario.model';

@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectModel(Usuario)
    private readonly usuarioModel: typeof Usuario,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioModel.findAll({ raw: true });
  }

  async findById(id: number): Promise<Usuario | null> {
    return await this.usuarioModel.findByPk(id, { raw: true });
  }

  async create(usuario: Partial<Usuario>): Promise<Usuario> {
    const created = await this.usuarioModel.create(usuario as any);
    return created.get({ plain: true });
  }

  async update(id: number, usuario: Partial<Usuario>): Promise<Usuario | null> {
    const usuarioDb = await this.usuarioModel.findByPk(id);
    if (!usuarioDb) return null;
    await usuarioDb.update(usuario);
    return usuarioDb.get({ plain: true });
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.usuarioModel.destroy({ where: { id } });
    return deleted > 0;
  }
}
