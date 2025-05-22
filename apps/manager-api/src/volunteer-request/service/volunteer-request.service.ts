import { VolunteerRequestRepository } from '@core/domain/volunteer-request/repository/volunteer-request.repository';
import { AsyncTimeLogger } from '@core/global/decorator/time.decorator';
import { Injectable } from '@nestjs/common';
import { In, LessThan, MoreThan } from 'typeorm';
import { GetVolunteerRequestQuery } from '../dto/request/query.request';

@Injectable()
export class VolunteerRequestService {
  constructor(
    private readonly volunteerRequestRepository: VolunteerRequestRepository,
  ) {}

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
}
