import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';
import { formatErrors } from './global/exception/validation.exception';

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
const initializeApplication = async (app: INestApplication) => {
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
};
