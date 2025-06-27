import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.model';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }

  async findById(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findById(id);
  }

  async create(usuario: Partial<Usuario>): Promise<Usuario> {
    return this.usuarioRepository.create(usuario);
  }

  async update(id: number, usuario: Partial<Usuario>): Promise<Usuario | null> {
    return this.usuarioRepository.update(id, usuario);
  }

  async delete(id: number): Promise<boolean> {
    return this.usuarioRepository.delete(id);
  }
}
