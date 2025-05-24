import { VolunteerRequestStatus } from '@core/domain/volunteer-request/entity/volunteer-request.enum';
import { VolunteerRequestException } from '@core/domain/volunteer-request/exception/volunteer-request.exception';
import { VolunteerRequestRepository } from '@core/domain/volunteer-request/repository/volunteer-request.repository';
import { AsyncTimeLogger } from '@core/global/decorator/time.decorator';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';
import { In, LessThan, MoreThan } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { GetVolunteerRequestQuery } from '../dto/request/query.request';

@Injectable()
export class VolunteerRequestService {
  constructor(
    private readonly volunteerRequestRepository: VolunteerRequestRepository,
  ) {}

  @Transactional()
  @AsyncTimeLogger()
  public async approveRequest(userId: number, id: number) {
    const request = await this.getRequestOrThrow(userId, id);
    await this.volunteerRequestRepository.update(request.id, {
      status: VolunteerRequestStatus.Approve,
    });
  }

  @Transactional()
  @AsyncTimeLogger()
  public async rejectRequest(userId: number, id: number) {
    const request = await this.getRequestOrThrow(userId, id);
    await this.volunteerRequestRepository.update(request.id, {
      status: VolunteerRequestStatus.Reject,
    });
  }

  @AsyncTimeLogger()
  public async getVolunteerRequest(
    userId: number,
    query: GetVolunteerRequestQuery,
  ) {
    const { volunteerWorkId, status, dayOfWeek, start, end } = query;

    return await this.volunteerRequestRepository.find({
      relations: {
        user: true,
        volunteerWork: {
          volunteerRequestList: true,
        },
      },
      where: {
        status: status ? In(status) : undefined,
        volunteerWork: {
          id: volunteerWorkId,
          dayOfWeek,
          startDate: end ? LessThan(end) : undefined,
          endDate: start ? MoreThan(start) : undefined,
          isRemoved: false,
          agency: {
            managerList: {
              id: userId,
            },
          },
        },
      },
    });
  }

  private async getRequestOrThrow(managerId: number, requestId: number) {
    return await this.volunteerRequestRepository
      .findOneOrFail({
        relations: {
          user: true,
          volunteerWork: {
            volunteerRequestList: true,
          },
        },
        where: {
          id: requestId,
          volunteerWork: {
            agency: {
              managerList: {
                id: managerId,
              },
            },
          },
        },
      })
      .catch(() => {
        throw new EGException(VolunteerRequestException.NOT_FOUND);
      });
  }
}
