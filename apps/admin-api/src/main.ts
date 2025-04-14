import {
  initializeApplication,
  initializeBeforeApplication,
} from '@core/global/utils/init';
import { NestFactory } from '@nestjs/core';
import { AdminAppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  initializeBeforeApplication();
  const app = await NestFactory.create(AdminAppModule);
  initializeApplication(app);
  initializeSwagger(app);

  await app.listen(process.env.ADMIN_API_PORT);
}

const initializeSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Good Point Admin API')
    .setDescription('봉사기관 담당자를 위한 API 문서입니다.')
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
