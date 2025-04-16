import { CustomRepository } from '@core/global/decorator/repository.decorator';
import { EGException } from '@core/global/exception/exception';
import { Repository } from 'typeorm';
import { Manager } from '../entity/manager.entity';
import { ManagerException } from '../exception/manager.exception';

@CustomRepository(Manager)
export class ManagerRepository extends Repository<Manager> {
  async findOneByIdOrFail(managerId: number) {
    return await this.findOneOrFail({
      where: {
        id: managerId,
        isRemoved: false,
      },
    }).catch(() => {
      throw new EGException(ManagerException.NOT_FOUND);
    });
  }
}
