import {
  initializeApplication,
  initializeBeforeApplication,
} from '@core/global/utils/init';
import { NestFactory } from '@nestjs/core';
import { AdminAppModule } from './app.module';

async function bootstrap() {
  initializeBeforeApplication();
  const app = await NestFactory.create(AdminAppModule);
  initializeApplication(app);

  await app.listen(process.env.ADMIN_API_PORT);
}

bootstrap();
