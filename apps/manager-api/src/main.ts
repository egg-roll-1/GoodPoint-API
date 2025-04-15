import {
  initializeApplication,
  initializeBeforeApplication,
} from '@core/global/utils/init';
import { INestApplication } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminAppModule } from './app.module';
import { JwtAuthGuard } from './auth/guard/jwt.guard';

async function bootstrap() {
  initializeBeforeApplication();
  const app = await NestFactory.create(AdminAppModule);
  initializeApplication(app);
  initializeSwagger(app);

  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));

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
