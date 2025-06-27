import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './usuario.model';

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
    // Cria apenas com os campos obrigatórios e opcionais explicitamente permitidos
    const created = await this.usuarioModel.create({
      nome: usuario.nome,
      senha: usuario.senha,
      email: usuario.email,
      lattes: usuario.lattes,
      perfil: usuario.perfil,
    } as any); // 'as any' aqui é seguro pois já validamos os campos obrigatórios
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
