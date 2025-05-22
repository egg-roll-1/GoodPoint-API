import { ManagerRepository } from '@core/domain/manager/repository/manager.repository';
import { UserException } from '@core/domain/user/exception/user.exception';
import { AsyncTimeLogger } from '@core/global/decorator/time.decorator';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ManagerService {
  constructor(private managerRepository: ManagerRepository) {}

  @AsyncTimeLogger()
  async getUserProfile(userId: number) {
    return await this.managerRepository
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
