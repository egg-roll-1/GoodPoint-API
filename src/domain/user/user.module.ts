import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/global/repository/repository.module';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';

@Module({
  imports: [RepositoryModule.forFeatures([UserRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
