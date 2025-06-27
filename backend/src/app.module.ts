import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Usuario } from './usuario/usuario.model';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { Paper } from './paper/paper.model';
import { UsuarioPaper } from './paper/usuario_paper.model';
import { PaperController } from './paper/paper.controller';
import { PaperModule } from './paper/paper.module';
import { Conferencia } from './conferencia/conferencia.model';
import { PaperConf } from './paper_conf/paper_conf.model';
import { ConferenciaModule } from './conferencia/conferencia.module';
import { PaperConfModule } from './paper_conf/paper_conf.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: parseInt(configService.get<string>('DATABASE_PORT', '5432'), 10),
        username: configService.get<string>('DATABASE_USER', 'postgres'),
        password: configService.get<string>('DATABASE_PASSWORD', '12345'),
        database: configService.get<string>('DATABASE_NAME', 'artigo_web'),
        models: [Usuario, Paper, UsuarioPaper, Conferencia, PaperConf],
        autoLoadModels: true,
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        logging:
          configService.get<string>('NODE_ENV') !== 'production'
            ? console.log
            : false,
      }),
    }),
    SequelizeModule.forFeature([
      Usuario,
      Paper,
      UsuarioPaper,
      Conferencia,
      PaperConf,
    ]),
    UsuarioModule,
    AuthModule,
    PaperModule,
    ConferenciaModule,
    PaperConfModule,
  ],
  controllers: [AppController, UsuarioController, PaperController],
})
export class AppModule {}
