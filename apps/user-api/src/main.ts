import {
  initializeApplication,
  initializeBeforeApplication,
} from '@core/global/utils/init';
import { INestApplication } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserAppModule } from './app.module';
import { JwtAuthGuard } from './auth/guard/jwt.guard';

async function bootstrap() {
  initializeBeforeApplication();
  const app = await NestFactory.create(UserAppModule);
  initializeApplication(app);
  initializeSwagger(app);

  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));

  await app.listen(3000);
}

const initializeSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Good Point User API')
    .setDescription('일반 사용자를 위한 API 문서입니다.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  document.paths = Object.keys(document.paths)
    .reverse()
    .reduce((acc, path) => {
      acc[path] = document.paths[path];
      return acc;
    }, {});

  SwaggerModule.setup('goodpoint-api-document', app, document);
};

bootstrap();
