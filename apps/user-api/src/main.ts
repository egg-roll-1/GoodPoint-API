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

  await app.listen(process.env.USER_API_PORT);
}

const initializeSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Good Point User API')
    .setDescription(
      `봉사활동 일반신청자를 위한 API 문서입니다. 용어 정의는 다음과 같습니다.\n
      - VolunteerWork: 봉사활동
      - VolunteerRequest: 봉사활동 신청
      - VolunteerHistory: 봉사활동 내역 (출석부)
      - CreditHistory: 굿포인트 적립/사용 내역
      - Agency: 봉사기관
      `,
    )
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
