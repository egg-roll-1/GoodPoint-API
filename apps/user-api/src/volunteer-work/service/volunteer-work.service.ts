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
        agency: true,
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

    /** todo 봉사활동신청내역 생성 */

    // 1. 이미 신청한 내역이 존재하는 경우 - 이미 신청했습니다 예외
    const alreadyApplied = await this.volunteerRequestRepository.findOne({
      where: {
        userId,
        volunteerWork: { id: volunteerWorkId },
      },
    });

    if (alreadyApplied) {
      throw new EGException({
        code: 'VRE001',
        message: '이미 신청한 봉사활동입니다.',
        status: 400,
      });
    }

    // 2. 봉사활동신청(VolunteerRequest) 엔티티 객체 생성
    const volunteerRequest = this.volunteerRequestRepository.create({
      userId,
      volunteerWork,
    });

    // 3. 2에서 만든 엔티티 저장 save
    await this.volunteerRequestRepository.save(volunteerRequest);
  }
}
