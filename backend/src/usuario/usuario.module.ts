import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './usuario.model';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [SequelizeModule.forFeature([Usuario])],
  providers: [UsuarioRepository, UsuarioService],
  exports: [UsuarioRepository, UsuarioService],
})
export class UsuarioModule {}
