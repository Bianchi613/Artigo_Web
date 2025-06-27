import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Configuração Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Acadêmica')
    .setDescription(
      'Backend NestJS + Sequelize/PostgreSQL para sistema acadêmico',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Documentação API Acadêmica',
  });

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
  console.log(`\nServidor rodando na porta ${port}`);
  console.log(`Documentação Swagger: http://localhost:${port}/api`);
}

void bootstrap();
