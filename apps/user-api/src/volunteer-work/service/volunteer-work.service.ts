import { VolunteerRequest } from '@core/domain/volunteer-request/entity/volunteer-request.entity';
import { VolunteerRequestStatus } from '@core/domain/volunteer-request/entity/volunteer-request.enum';
import { VolunteerRequestException } from '@core/domain/volunteer-request/exception/volunteer-request.exception';
import { VolunteerRequestRepository } from '@core/domain/volunteer-request/repository/volunteer-request.repository';
import { VolunteerWorkStatus } from '@core/domain/volunteer-work/entity/volunteer-work.enum';
import { VolunteerWorkException } from '@core/domain/volunteer-work/exception/volunteer-work.exception';
import { VolunteerWorkRepository } from '@core/domain/volunteer-work/repository/volunteer-work.repository';
import { Page } from '@core/global/dto/response/paging.response';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';
import { In, Like } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import {
  GetVolunteerRequest,
  GetVolunteerRequestByGeometry,
} from '../dto/request/query.request';

@Injectable()
export class VolunteerWorkService {
  constructor(
    private readonly volunteerWorkRepository: VolunteerWorkRepository,
    private readonly volunteerRequestRepository: VolunteerRequestRepository,
  ) {}

  public async searchListByGeometry(request: GetVolunteerRequestByGeometry) {
    const { latitude, longitude, distanceKm } = request;
    const query = this.volunteerWorkRepository
      .createQueryBuilder('work')
      .select()
      .leftJoinAndSelect('work.volunteerRequestList', 'request')
      .leftJoinAndSelect('work.agency', 'agency')
      .leftJoinAndSelect('agency.managerList', 'manager')
      .leftJoinAndSelect('work.tagList', 'tagList')
      .leftJoinAndSelect('tagList.tag', 'tag')
      .where('work.status = :status', {
        status: VolunteerWorkStatus.Recruiting,
      });

    query.andWhere(`work.latitude IS NOT NULL AND work.longitude IS NOT NULL`);
    query.andWhere(
      `(
        6371 * ACOS(
            COS(RADIANS(:latitude)) * COS(RADIANS(work.latitude)) *
            COS(RADIANS(work.longitude) - RADIANS(:longitude)) +
            SIN(RADIANS(:latitude)) * SIN(RADIANS(work.latitude))
        )
    ) < :distanceKm`,
      { latitude, longitude, distanceKm },
    );

    query.limit(800);

    const workList = query.getMany();
    return workList;
  }

  public async searchList(request: GetVolunteerRequest) {
    const { page, size, keyword } = request;
    const [content, total] = await this.volunteerWorkRepository.findAndCount({
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
        title: keyword ? Like(`%${keyword}%`) : undefined,
      },
      skip: (page - 1) * size,
      take: size,
    });

    return Page.createPageDto({ content, total, size, page });
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
