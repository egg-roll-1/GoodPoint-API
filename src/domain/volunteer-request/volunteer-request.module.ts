import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/global/repository/repository.module';
import { UserController } from './controller/volunteer-request.controller';
import { UserRepository } from './repository/volunteer-request.repository';
import { UserService } from './service/volunteer-request.service';

@Module({
  imports: [RepositoryModule.forFeatures([UserRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
