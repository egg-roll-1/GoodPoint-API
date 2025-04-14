import { UserException } from '@core/domain/user/exception/user.exception';
import { UserRepository } from '@core/domain/user/repository/user.repository';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserProfile(userId: number) {
    return await this.userRepository
      .findOneOrFail({
        where: {
          id: userId,
        },
      })
      .catch(() => {
        throw new EGException(UserException.NOT_FOUND);
      });
  }
}
