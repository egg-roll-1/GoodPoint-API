import { VolunteerRequest } from '@core/domain/volunteer-request/entity/volunteer-request.entity';
import { VolunteerRequestStatus } from '@core/domain/volunteer-request/entity/volunteer-request.enum';
import { VolunteerRequestException } from '@core/domain/volunteer-request/exception/volunteer-request.exception';
import { VolunteerRequestRepository } from '@core/domain/volunteer-request/repository/volunteer-request.repository';
import { VolunteerWorkStatus } from '@core/domain/volunteer-work/entity/volunteer-work.enum';
import { VolunteerWorkException } from '@core/domain/volunteer-work/exception/volunteer-work.exception';
import { VolunteerWorkRepository } from '@core/domain/volunteer-work/repository/volunteer-work.repository';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { GetVolunteerRequest } from '../dto/request/query.request';

@Injectable()
export class VolunteerWorkService {
  constructor(
    private readonly volunteerWorkRepository: VolunteerWorkRepository,
    private readonly volunteerRequestRepository: VolunteerRequestRepository,
  ) {}

  public async searchListByGeometry(request: GetVolunteerRequest) {
    const { latitude, longitude, distanceKm, keyword } = request;
    const query = this.volunteerWorkRepository
      .createQueryBuilder('work')
      .leftJoinAndSelect('work.volunteerRequestList', 'request')
      .leftJoinAndSelect('work.agency', 'agency')
      .leftJoinAndSelect('agency.managerList', 'manager')
      .leftJoinAndSelect('work.tagList', 'tagList')
      .leftJoinAndSelect('tagList.tag', 'tag')
      .addSelect(
        `(
          6371 * ACOS(
            COS(RADIANS(:latitude)) * 
            COS(RADIANS(work.latitude)) * 
            COS(RADIANS(work.longitude) - RADIANS(:longitude)) + 
            SIN(RADIANS(:latitude)) * 
            SIN(RADIANS(work.latitude))
          )
        )`,
        'distance',
      )
      .where('work.status = :status', {
        status: VolunteerWorkStatus.Recruiting,
      })
      .andWhere(`work.latitude IS NOT NULL AND work.longitude IS NOT NULL`)
      .andWhere(
        `(
            6371 * ACOS(
              COS(RADIANS(:latitude)) * 
              COS(RADIANS(work.latitude)) * 
              COS(RADIANS(work.longitude) - RADIANS(:longitude)) + 
              SIN(RADIANS(:latitude)) * 
              SIN(RADIANS(work.latitude))
            )
          ) < :distanceKm`,
      )
      .setParameters({ latitude, longitude, distanceKm });

    query.orderBy('distance', 'ASC');

    if (keyword) {
      query.andWhere(`work.title LIKE :keyword OR agency.title LIKE :keyword`, {
        keyword: `%${keyword}%`,
      });
    }

    query.limit(2000);

    const workList = query.getMany();
    return workList;
  }

  async getDetail(id: number) {
    const result = await this.volunteerWorkRepository.findOneOrFail({
      relations: {
        volunteerRequestList: true,
        agency: {
          managerList: true,
        },
        tagList: {
          tag: true,
        },
      },
      where: {
        id,
      },
    });

    return result;
  }

  /**
   * 봉사활동을 신청합니다.
   * @param userId 사용자 ID
   * @param id 봉사활동(volunteerWork) ID
   */
  @Transactional()
  async applyVolunteer(userId: number, volunteerWorkId: number) {
    const volunteerWork = await this.volunteerWorkRepository
      .findOneOrFail({
        where: {
          id: volunteerWorkId,
          isRemoved: false,
        },
      })
      .catch(() => {
        throw new EGException(VolunteerWorkException.NOT_FOUND);
      });

    //모집상태확인
    if (volunteerWork.status != VolunteerWorkStatus.Recruiting) {
      throw new EGException(VolunteerWorkException.CANNOT_APPLY_STATUS);
    }

    const alreadyRequest = await this.volunteerRequestRepository.findOne({
      where: {
        userId,
        volunteerWork: { id: volunteerWorkId },
        status: In([
          VolunteerRequestStatus.Approve,
          VolunteerRequestStatus.Wait,
        ]),
      },
    });

    if (alreadyRequest) {
      throw new EGException(VolunteerRequestException.ALREADY_EXIST);
    }

    return await this.volunteerRequestRepository.save(
      VolunteerRequest.createOne({
        userId,
        volunteerWorkId: volunteerWork.id,
      }),
    );
  }
}
