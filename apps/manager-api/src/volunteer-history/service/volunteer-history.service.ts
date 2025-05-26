import { CreditHistory } from '@core/domain/credit-history/entity/credit-history.entity';
import { CreditHistoryRepository } from '@core/domain/credit-history/repository/credit-history.repository';
import { UserRepository } from '@core/domain/user/repository/user.repository';
import { VolunteerHistoryException } from '@core/domain/volunteer-history/exception/volunteer-history.exception';
import { VolunteerHistoryRepository } from '@core/domain/volunteer-history/repository/volunteer-history.repository';
import { VolunteerRequestStatus } from '@core/domain/volunteer-request/entity/volunteer-request.enum';
import { VolunteerRequestException } from '@core/domain/volunteer-request/exception/volunteer-request.exception';
import { VolunteerRequestRepository } from '@core/domain/volunteer-request/repository/volunteer-request.repository';
import { VolunteerWorkException } from '@core/domain/volunteer-work/exception/volunteer-work.exception';
import { VolunteerWorkRepository } from '@core/domain/volunteer-work/repository/volunteer-work.repository';
import { AsyncTimeLogger } from '@core/global/decorator/time.decorator';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { PostVolunteerHistoryRequest } from '../dto/request/post.request';
import { GetVolunteerHistoryRequest } from '../dto/request/query.request';

@Injectable()
export class VolunteerHistoryService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly creditRepository: CreditHistoryRepository,
    private readonly volunteerWorkRepository: VolunteerWorkRepository,
    private readonly volunteerHistoryRepository: VolunteerHistoryRepository,
    private readonly volunteerRequestRepository: VolunteerRequestRepository,
  ) {}

  @AsyncTimeLogger()
  @Transactional()
  public async removeHistory(managerId: number, id: number) {
    const history = await this.findOneHistoryOrThrow(managerId, id);
    await this.volunteerHistoryRepository.delete(history.id);
    await this.creditRepository.delete(history.creditHistoryId);
  }

  @AsyncTimeLogger()
  @Transactional()
  public async handleHistory(
    managerId: number,
    request: PostVolunteerHistoryRequest,
  ) {
    await this.authorizeVolunteerWorkOrThrow(
      managerId,
      request.volunteerWorkId,
    );
    await this.isValidVolunteerHistoryRequestOrThrow(request);

    const { userId } = request;
    const _volunteerHistory = request.toEntity();
    const credit = await this.creditRepository.save(
      CreditHistory.create({ userId, amount: _volunteerHistory.minute * 20 }),
    );

    _volunteerHistory.creditHistoryId = credit.id;
    return await this.volunteerHistoryRepository.save(_volunteerHistory);
  }

  private async isValidVolunteerHistoryRequestOrThrow(
    request: PostVolunteerHistoryRequest,
  ) {
    await this.isRequestExistOrThrow(request);
    await this.isDoubleHistoryThenThrow(request);
  }

  private async isRequestExistOrThrow(request: PostVolunteerHistoryRequest) {
    const { volunteerWorkId, userId } = request;
    return await this.volunteerRequestRepository
      .findOneOrFail({
        where: {
          status: In([
            VolunteerRequestStatus.Wait,
            VolunteerRequestStatus.Approve,
          ]),
          volunteerWorkId,
          userId,
          isRemoved: false,
        },
      })
      .catch(() => {
        throw new EGException(VolunteerRequestException.NOT_FOUND);
      });
  }

  private async isDoubleHistoryThenThrow(request: PostVolunteerHistoryRequest) {
    const { volunteerWorkId, userId, startDateTime, endDateTime } = request;

    const start = dayjs(startDateTime).startOf('day').toDate();
    const end = dayjs(endDateTime).endOf('day').toDate();

    const volunteerHistory = await this.volunteerHistoryRepository.findOne({
      where: {
        volunteerWorkId,
        userId,
        startDateTime: LessThanOrEqual(end),
        endDateTime: MoreThanOrEqual(start),
      },
    });

    if (volunteerHistory) {
      throw new EGException(VolunteerHistoryException.ALREADY_EXIST);
    }
  }

  private async authorizeVolunteerWorkOrThrow(
    managerId: number,
    volunteerWorkId: number,
  ) {
    return await this.volunteerWorkRepository
      .findOneOrFail({
        where: {
          id: volunteerWorkId,
          isRemoved: false,
          agency: {
            managerList: {
              id: managerId,
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

  @AsyncTimeLogger()
  public async findHistory(
    managerId: number,
    request: GetVolunteerHistoryRequest,
  ) {
    const { volunteerWorkId, startDateTime, endDateTime } = request;
    const historyList = await this.volunteerHistoryRepository.find({
      relations: {
        user: true,
        volunteerWork: {
          volunteerRequestList: true,
        },
      },
      where: {
        volunteerWorkId,
        volunteerWork: {
          agency: {
            managerList: {
              id: managerId,
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
