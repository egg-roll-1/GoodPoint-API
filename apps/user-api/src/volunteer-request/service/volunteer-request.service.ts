import { VolunteerRequestStatus } from '@core/domain/volunteer-request/entity/volunteer-request.enum';
import { VolunteerRequestException } from '@core/domain/volunteer-request/exception/volunteer-request.exception';
import { VolunteerRequestRepository } from '@core/domain/volunteer-request/repository/volunteer-request.repository';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class VolunteerRequestService {
  constructor(
    private readonly volunteerRequestRepository: VolunteerRequestRepository,
  ) {}

  /**
   * 내가 신청한 봉사활동 내역을 조회합니다.
   * @param userId
   * @returns
   */
  public async getVolunteerRequestList(userId: number) {
    return await this.volunteerRequestRepository.find({
      relations: {
        volunteerWork: {
          tagList: {
            tag: true,
          },
          volunteerRequestList: true,
        },
      },
      where: {
        userId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  @Transactional()
  public async cancel(userId: number, id: number) {
    await this.findOneByUserOrThrow(userId, id);

    await this.volunteerRequestRepository.update(id, {
      status: VolunteerRequestStatus.Canceled,
    });
  }

  private async findOneByUserOrThrow(userId: number, id: number) {
    return await this.volunteerRequestRepository
      .findOneOrFail({
        where: {
          id,
          userId,
        },
      })
      .catch(() => {
        throw new EGException(VolunteerRequestException.NOT_FOUND);
      });
  }
}
