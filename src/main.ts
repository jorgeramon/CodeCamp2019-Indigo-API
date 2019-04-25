import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { environment } from './environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle(environment.swagger.title)
    .setVersion(environment.swagger.version)
    .build());

  SwaggerModule.setup('documentation', app, document);

  await app.listen(environment.server.port);
}

bootstrap();
