import { CreditHistory } from '@core/domain/credit-history/entity/credit-history.entity';
import { CreditHistoryRepository } from '@core/domain/credit-history/repository/credit-history.repository';
import { VolunteerHistoryException } from '@core/domain/volunteer-history/exception/volunteer-history.exception';
import { VolunteerHistoryRepository } from '@core/domain/volunteer-history/repository/volunteer-history.repository';
import { VolunteerWorkException } from '@core/domain/volunteer-work/exception/volunteer-work.exception';
import { VolunteerWorkRepository } from '@core/domain/volunteer-work/repository/volunteer-work.repository';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { PostVolunteerHistoryRequest } from '../dto/request/post.request';
import { GetVolunteerHistoryRequest } from '../dto/request/query.request';

@Injectable()
export class VolunteerHistoryService {
  constructor(
    private readonly creditRepository: CreditHistoryRepository,
    private readonly volunteerWorkRepository: VolunteerWorkRepository,
    private readonly volunteerHistoryRepository: VolunteerHistoryRepository,
  ) {}

  @Transactional()
  public async removeHistory(managerId: number, id: number) {
    const history = await this.findOneHistoryOrThrow(managerId, id);
    await this.creditRepository.delete(history.creditHistoryId);
    await this.volunteerHistoryRepository.delete(history.id);
  }

  @Transactional()
  public async handleHistory(
    managerId: number,
    request: PostVolunteerHistoryRequest,
  ) {
    await this.findVolunteerWorkOrThrow(managerId);
    const { volunteerWorkId, userId } = request;

    // 해당 일에 이미 출석 내역이 존재하는지 확인합니다.
    const findExistOrThrow = async () => {
      const startOfDate = dayjs().startOf('day').toDate();
      const endOfDate = dayjs().endOf('day').toDate();

      const volunteerHistory = await this.volunteerHistoryRepository.findOne({
        where: {
          volunteerWorkId,
          userId,
          startDateTime: Between(startOfDate, endOfDate),
        },
      });

      if (volunteerHistory) {
        throw new EGException(VolunteerHistoryException.ALREADY_EXIST);
      }
    };

    await findExistOrThrow();

    const _volunteerHistory = request.toEntity();
    const credit = await this.creditRepository.save(
      CreditHistory.create({ userId, amount: _volunteerHistory.minute * 20 }),
    );

    _volunteerHistory.creditHistoryId = credit.id;
    return await this.volunteerHistoryRepository.save(_volunteerHistory);
  }

  private async findVolunteerWorkOrThrow(userId: number) {
    return await this.volunteerWorkRepository
      .findOneOrFail({
        where: {
          agency: {
            managerList: {
              id: userId,
            },
          },
        },
      })
      .catch(() => {
        throw new EGException(VolunteerWorkException.NOT_FOUND);
      });
  }

  private async findOneHistoryOrThrow(managerId: number, id: number) {
    const volunteerHistory = await this.volunteerHistoryRepository
      .findOneOrFail({
        where: {
          id: id,
          volunteerWork: {
            agency: {
              managerList: { id: managerId },
            },
          },
        },
      })
      .catch(() => {
        throw new EGException(VolunteerHistoryException.NOT_FOUND);
      });

    return volunteerHistory;
  }

  public async findHistory(
    userId: number,
    request: GetVolunteerHistoryRequest,
  ) {
    const { volunteerWorkId, startDateTime, endDateTime } = request;
    const historyList = await this.volunteerHistoryRepository.find({
      where: {
        volunteerWorkId,
        volunteerWork: {
          agency: {
            managerList: {
              id: userId,
            },
          },
        },
        startDateTime: LessThanOrEqual(endDateTime),
        endDateTime: MoreThanOrEqual(startDateTime),
      },
    });

    return historyList;
  }
}
