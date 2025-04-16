import { CustomRepository } from '@core/global/decorator/repository.decorator';
import { EGException } from '@core/global/exception/exception';
import { Repository } from 'typeorm';
import { Agency } from '../entity/agency.entity';
import { AgencyException } from '../exception/agency.exception';

@CustomRepository(Agency)
export class AgencyRepository extends Repository<Agency> {
  async findOneOrThrow(managerId: number, agencyId: number) {
    return await this.findOneOrFail({
      where: {
        id: agencyId,
        isRemoved: false,
        managerList: {
          id: managerId,
          isRemoved: false,
        },
      },
    }).catch(() => {
      throw new EGException(AgencyException.NOT_FOUND);
    });
  }
}
