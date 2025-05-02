import { NestFactory } from '@nestjs/core';
import { TesterModule } from './tester.module';
import {
  initializeApplication,
  initializeBeforeApplication,
} from '@core/global/utils/init';

async function bootstrap() {
  initializeBeforeApplication();
  const app = await NestFactory.create(TesterModule);
  initializeApplication(app);
  await app.listen(8085);
}

bootstrap();
