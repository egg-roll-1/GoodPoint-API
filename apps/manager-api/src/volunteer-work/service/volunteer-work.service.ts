import { AgencyRepository } from '@core/domain/agency/repository/agency.repository';
import { VolunteerWorkException } from '@core/domain/volunteer-work/exception/volunteer-work.exception';
import { VolunteerWorkRepository } from '@core/domain/volunteer-work/repository/volunteer-work.repository';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { PatchVolunteerWorkRequest } from '../dto/request/patch.request';
import { PostVolunteerWorkRequest } from '../dto/request/post.request';
import { GetVolunteerWorkRequest } from '../dto/request/query.request';

@Injectable()
export class VolunteerWorkService {
  constructor(
    private readonly agencyRepository: AgencyRepository,
    private readonly volunteerWorkRepository: VolunteerWorkRepository,
  ) {}

  @Transactional()
  async register(managerId: number, request: PostVolunteerWorkRequest) {
    await this.agencyRepository.findOneOrThrow(managerId, request.agencyId);
    return await this.volunteerWorkRepository.save(request.toEntity());
  }

  @Transactional()
  async patch(
    managerId: number,
    volunteerWorkId: number,
    request: PatchVolunteerWorkRequest,
  ) {
    const volunteerWork = await this.findVolunteerWorkOrThrow(
      managerId,
      volunteerWorkId,
    );

    await this.volunteerWorkRepository.save(request.toEntity(volunteerWork));
  }

  @Transactional()
  async remove(managerId: number, volunteerWorkId: number) {
    const volunteerWork = await this.findVolunteerWorkOrThrow(
      managerId,
      volunteerWorkId,
    );

    await this.volunteerWorkRepository.update(volunteerWork.id, {
      isRemoved: true,
    });
  }

  async getList(managerId: number, query: GetVolunteerWorkRequest) {
    const { agencyId } = query;

    const volunteerWorkList = await this.volunteerWorkRepository.find({
      where: {
        agency: {
          id: agencyId,
          managerList: {
            id: managerId,
            isRemoved: false,
          },
        },
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return volunteerWorkList;
  }

  private async findVolunteerWorkOrThrow(managerId: number, id: number) {
    return await this.volunteerWorkRepository
      .findOneOrFail({
        where: {
          agency: {
            managerList: {
              id: managerId,
            },
          },
          isRemoved: false,
          id,
        },
      })
      .catch(() => {
        throw new EGException(VolunteerWorkException.NOT_FOUND);
      });
  }
}
