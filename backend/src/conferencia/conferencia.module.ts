import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Conferencia } from './conferencia.model';
import { ConferenciaRepository } from './conferencia.repository';
import { ConferenciaService } from './conferencia.service';
import { ConferenciaController } from './conferencia.controller';

@Module({
  imports: [SequelizeModule.forFeature([Conferencia])],
  providers: [ConferenciaRepository, ConferenciaService],
  controllers: [ConferenciaController],
  exports: [ConferenciaService],
})
export class ConferenciaModule {}
