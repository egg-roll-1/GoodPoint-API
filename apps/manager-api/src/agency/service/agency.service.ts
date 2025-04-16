import { AgencyException } from '@core/domain/agency/exception/agency.exception';
import { AgencyRepository } from '@core/domain/agency/repository/agency.repository';
import { ManagerRepository } from '@core/domain/manager/repository/manager.repository';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { PatchAgencyRequest } from '../dto/request/patch.request';
import { PostAgencyRequest } from '../dto/request/post.request';

@Injectable()
export class AgencyService {
  constructor(
    private readonly managerRepository: ManagerRepository,
    private readonly agencyRepository: AgencyRepository,
  ) {}

  @Transactional()
  public async registerAgency(managerId: number, body: PostAgencyRequest) {
    const manager = await this.managerRepository.findOneByIdOrFail(managerId);
    const agency = await this.agencyRepository.save(body.toEntity(manager.id));
    await this.managerRepository.update(manager.id, { agencyId: agency.id });

    return agency;
  }

  @Transactional()
  public async patchAgency(
    managerId: number,
    agencyId: number,
    body: PatchAgencyRequest,
  ) {
    const agency = await this.agencyRepository.findOneOrThrow(
      managerId,
      agencyId,
    );

    return await this.agencyRepository.save(body.toEntity(agency));
  }

  public async getAgencyDetail(managerId: number, agencyId: number) {
    return await this.agencyRepository
      .findOneOrFail({
        relations: {
          managerList: true,
        },
        where: {
          id: agencyId,
          isRemoved: false,
          managerList: {
            id: managerId,
          },
        },
      })
      .catch(() => {
        throw new EGException(AgencyException.NOT_FOUND);
      });
  }

  public async getAgencyList(managerId: number) {
    const agencyList = await this.agencyRepository.find({
      relations: {
        managerList: true,
      },
      where: {
        managerList: {
          id: managerId,
        },
        isRemoved: false,
      },
    });

    return agencyList;
  }
}
