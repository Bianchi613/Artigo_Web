import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Paper } from './paper.model';
import { Usuario } from '../usuario/usuario.model';
import { UsuarioPaper } from './usuario_paper.model';
import { PaperRepository } from './paper.repository';
import { PaperService } from './paper.service';
import { PaperController } from './paper.controller';

@Module({
  imports: [SequelizeModule.forFeature([Paper, Usuario, UsuarioPaper])],
  providers: [PaperRepository, PaperService],
  controllers: [PaperController],
  exports: [PaperService],
})
export class PaperModule {}
