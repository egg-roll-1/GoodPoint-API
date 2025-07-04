import { AgencyRepository } from '@core/domain/agency/repository/agency.repository';
import { VolunteerWorkException } from '@core/domain/volunteer-work/exception/volunteer-work.exception';
import { VolunteerWorkRepository } from '@core/domain/volunteer-work/repository/volunteer-work.repository';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { PatchVolunteerWorkRequest } from '../dto/request/patch.request';
import { PostVolunteerWorkRequest } from '../dto/request/post.request';
import { GetVolunteerWorkRequest } from '../dto/request/query.request';
import { GeoService } from '@core/infrastructure/openapi/geo.service';
import { VolunteerWork } from '@core/domain/volunteer-work/entity/volunteer-work.entity';

@Injectable()
export class VolunteerWorkService {
  constructor(
    private readonly agencyRepository: AgencyRepository,
    private readonly volunteerWorkRepository: VolunteerWorkRepository,
    private readonly geoService: GeoService,
  ) {}

  @Transactional()
  public async register(managerId: number, request: PostVolunteerWorkRequest) {
    await this.agencyRepository.findOneOrThrow(managerId, request.agencyId);
    const volunteerWork = await this.volunteerWorkRepository.save(
      request.toEntity(),
    );

    await this.applyCoord(volunteerWork);
    return volunteerWork;
  }

  @Transactional()
  public async patch(
    managerId: number,
    volunteerWorkId: number,
    request: PatchVolunteerWorkRequest,
  ) {
    const _volunteerWork = await this.findVolunteerWorkOrThrow(
      managerId,
      volunteerWorkId,
    );

    const volunteerWork = await this.volunteerWorkRepository.save(
      request.toEntity(_volunteerWork),
    );

    await this.applyCoord(volunteerWork);
    return volunteerWork;
  }

  @Transactional()
  public async remove(managerId: number, volunteerWorkId: number) {
    const volunteerWork = await this.findVolunteerWorkOrThrow(
      managerId,
      volunteerWorkId,
    );

    await this.volunteerWorkRepository.update(volunteerWork.id, {
      isRemoved: true,
    });
  }

  public async getDetail(managerId: number, id: number) {
    const volunteerWork = await this.volunteerWorkRepository
      .findOneOrFail({
        relations: {
          volunteerRequestList: {
            user: true,
          },
        },
        where: {
          id,
          agency: {
            managerList: {
              id: managerId,
              isRemoved: false,
            },
          },
          isRemoved: false,
        },
      })
      .catch(() => {
        throw new EGException(VolunteerWorkException.NOT_FOUND);
      });

    return volunteerWork;
  }

  public async getList(managerId: number, query: GetVolunteerWorkRequest) {
    const { agencyId } = query;

    const volunteerWorkList = await this.volunteerWorkRepository.find({
      relations: {
        volunteerRequestList: true,
      },
      where: {
        agency: {
          id: agencyId,
          managerList: {
            id: managerId,
            isRemoved: false,
          },
        },
        isRemoved: false,
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

  @Transactional()
  private async applyCoord(volunteerWork: VolunteerWork) {
    const { latitude, longitude } = await this.geoService.addressToCoord(
      volunteerWork.workAddress,
    );

    volunteerWork.latitude = latitude;
    volunteerWork.longitude = longitude;

    await this.volunteerWorkRepository.update(volunteerWork.id, {
      latitude,
      longitude,
    });
  }
}
