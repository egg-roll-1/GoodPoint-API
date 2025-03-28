import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { EGException } from 'src/global/exception/exception';
import { UserException } from '../exception/user.exception';

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
