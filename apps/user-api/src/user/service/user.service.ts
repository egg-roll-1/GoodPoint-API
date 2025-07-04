import { UserException } from '@core/domain/user/exception/user.exception';
import { UserRepository } from '@core/domain/user/repository/user.repository';
import { AsyncTimeLogger } from '@core/global/decorator/time.decorator';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  @AsyncTimeLogger()
  async getUserProfile(userId: number) {
    return await this.userRepository
      .findOneOrFail({
        relations: {
          creditHistory: true,
        },
        where: {
          id: userId,
        },
      })
      .catch(() => {
        throw new EGException(UserException.NOT_FOUND);
      });
  }
}
