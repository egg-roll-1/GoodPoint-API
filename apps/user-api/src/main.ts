import {
  initializeApplication,
  initializeBeforeApplication,
} from '@core/global/utils/init';
import { NestFactory } from '@nestjs/core';
import { UserAppModule } from './app.module';

async function bootstrap() {
  initializeBeforeApplication();
  const app = await NestFactory.create(UserAppModule);
  initializeApplication(app);

  await app.listen(3000);
}

bootstrap();
