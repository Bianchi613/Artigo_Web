import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaperConf } from './paper_conf.model';
import { PaperConfRepository } from './paper_conf.repository';
import { PaperConfService } from './paper_conf.service';
import { PaperConfController } from './paper_conf.controller';

@Module({
  imports: [SequelizeModule.forFeature([PaperConf])],
  providers: [PaperConfRepository, PaperConfService],
  controllers: [PaperConfController],
  exports: [PaperConfService],
})
export class PaperConfModule {}
