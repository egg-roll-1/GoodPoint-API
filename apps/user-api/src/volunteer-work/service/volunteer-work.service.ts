import { VolunteerRequest } from '@core/domain/volunteer-request/entity/volunteer-request.entity';
import { VolunteerRequestException } from '@core/domain/volunteer-request/exception/volunteer-request.exception';
import { VolunteerRequestRepository } from '@core/domain/volunteer-request/repository/volunteer-request.repository';
import { VolunteerWorkStatus } from '@core/domain/volunteer-work/entity/volunteer-work.enum';
import { VolunteerWorkException } from '@core/domain/volunteer-work/exception/volunteer-work.exception';
import { VolunteerWorkRepository } from '@core/domain/volunteer-work/repository/volunteer-work.repository';
import { Page } from '@core/global/dto/response/paging.response';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { GetVolunteerRequest } from '../dto/request/query.request';
import { VolunteerRequestStatus } from '@core/domain/volunteer-request/entity/volunteer-request.enum';

@Injectable()
export class VolunteerWorkService {
  constructor(
    private volunteerWorkRepository: VolunteerWorkRepository,
    private readonly volunteerRequestRepository: VolunteerRequestRepository,
  ) {}

  /**
   * @todo 위, 경도 기반 조회
   * @param request
   */
  async searchList(request: GetVolunteerRequest) {
    const { page, size, status } = request;
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
        status: status ? In(status) : undefined,
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
