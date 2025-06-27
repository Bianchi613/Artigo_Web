import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Usuario } from './usuario/usuario.model';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioRepository } from './usuario/usuario.repository';
import { AppController } from './app.controller';

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
        models: [Usuario],
        autoLoadModels: true,
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        logging:
          configService.get<string>('NODE_ENV') !== 'production'
            ? console.log
            : false,
      }),
    }),
    SequelizeModule.forFeature([Usuario]),
  ],
  controllers: [AppController, UsuarioController],
  providers: [UsuarioService, UsuarioRepository],
})
export class AppModule {}
