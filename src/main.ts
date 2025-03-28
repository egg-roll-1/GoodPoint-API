import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';
import { formatErrors } from './global/exception/validation.exception';
import { JwtAuthGuard } from './domain/auth/guard/jwt.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  initializeApplication(app);

  await app.listen(3000);
}
bootstrap();

/**
 * 애플리케이션 초기화 로직
 * @param app
 */
const initializeApplication = (app: INestApplication) => {
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));

  // Validation pipeline
  // https://docs.nestjs.com/pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: formatErrors,
      forbidNonWhitelisted: true,
    }),
  );

  // CORS
  // https://docs.nestjs.com/security/cors
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ extended: true, limit: '100mb' }));

  initializeSwagger(app);
};

/**
 * Swagger 적용
 * @param app
 */
const initializeSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Good Point API')
    .setDescription('굿포인트 API 문서입니다.')
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
