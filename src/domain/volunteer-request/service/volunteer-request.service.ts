import { Injectable } from '@nestjs/common';
import { VolunteerRequestRepository } from '../repository/volunteer-request.repository';
import { Transactional } from 'typeorm-transactional';
import { VolunteerWorkRepository } from 'src/domain/volunteer-work/repository/volunteer-work.repository';
import { EGException } from 'src/global/exception/exception';
import { VolunteerWorkException } from 'src/domain/volunteer-work/exception/volunteer-work.exception';
import { VolunteerWorkStatus } from 'src/domain/volunteer-work/entity/volunteer-work.enum';
import { VolunteerApplyRequest } from '../dto/request/volunteer-request.request';

@Injectable()
export class VolunteerRequestService {
  constructor(
    private readonly volunteerWorkRepository: VolunteerWorkRepository,
    private readonly volunteerRequestRepository: VolunteerRequestRepository,
  ) {}

  /**
   * 내가 신청한 봉사활동 내역을 조회합니다.
   * @param userId
   * @returns
   */
  async getVolunteerRequestList(userId: number) {
    return await this.volunteerRequestRepository.find({
      relations: {
        volunteerWork: true,
      },
      where: {
        userId,
      },
    });
  }

  /**
   * 봉사활동을 신청합니다.
   * @param userId 사용자 ID
   * @param id 봉사활동(volunteerWork) ID
   */
  @Transactional()
  async applyVolunteer(userId: number, request: VolunteerApplyRequest) {
    const { volunteerWorkId } = request;

    const volunteerWork = await this.volunteerWorkRepository
      .findOneOrFail({
        where: {
          id: volunteerWorkId,
        },
      })
      .catch(() => {
        throw new EGException(VolunteerWorkException.NOT_FOUND);
      });

    if (volunteerWork.status != VolunteerWorkStatus.Recruiting) {
      throw new EGException(VolunteerWorkException.CANNOT_APPLY_STATUS);
    }

    /** todo 봉사활동신청내역 생성 */

    // 1. 이미 신청한 내역이 존재하는 경우 - 이미 신청했습니다 예외
    // 2. 봉사활동신청(VolunteerRequest) 엔티티 객체 생성
    // 3. 2에서 만든 엔티티 저장 save
  }
}
