import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './usuario.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioRepository {
  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioModel.findOne({ where: { email }, raw: true });
  }
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
    // Solução segura: cria um objeto apenas com os campos obrigatórios e faz checagem
    if (!usuario.nome || !usuario.senha || !usuario.email || !usuario.perfil) {
      throw new Error('Campos obrigatórios ausentes para criação de usuário');
    }
    // Gera hash da senha antes de salvar
    const senhaHash: string = await bcrypt.hash(usuario.senha, 10);
    const created = await this.usuarioModel.create({
      nome: usuario.nome,
      senha: senhaHash,
      email: usuario.email,
      lattes: usuario.lattes,
      perfil: usuario.perfil,
    } as any);
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
