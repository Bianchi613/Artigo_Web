export interface AuthUser {
  id: number;
  email: string;
  senha: string;
  perfil: string;
  [key: string]: any;
}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioRepository } from '../usuario/usuario.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    senha: string,
  ): Promise<Omit<AuthUser, 'senha'>> {
    const userResult = await this.usuarioRepository.findByEmail(email);
    const user: AuthUser | null = userResult ? (userResult as AuthUser) : null;
    let senhaValida = false;
    if (user && typeof user.senha === 'string' && typeof senha === 'string') {
      senhaValida = await (bcrypt as typeof import('bcryptjs')).compare(
        senha,
        user.senha,
      );
    }
    if (!user || !senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    // Não retorna a senha
    const { senha: senhaUsuario, ...result } = user;
    return result;
  }

  async login(user: Omit<AuthUser, 'senha'>) {
    const payload = { sub: user.id, email: user.email, perfil: user.perfil };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
