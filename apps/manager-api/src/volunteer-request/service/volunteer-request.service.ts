import { VolunteerRequestRepository } from '@core/domain/volunteer-request/repository/volunteer-request.repository';
import { Injectable } from '@nestjs/common';
import { In, LessThan, MoreThan } from 'typeorm';
import { GetVolunteerRequestQuery } from '../dto/request/query.request';

@Injectable()
export class VolunteerRequestService {
  constructor(
    private readonly volunteerRequestRepository: VolunteerRequestRepository,
  ) {}

  public async getVolunteerRequest(
    userId: number,
    query: GetVolunteerRequestQuery,
  ) {
    const { volunteerWorkId, status, dayOfWeek, start, end } = query;
    return await this.volunteerRequestRepository.find({
      relations: {
        user: true,
        volunteerWork: true,
      },
      where: {
        status: status ? In(status) : undefined,
        volunteerWork: {
          id: volunteerWorkId,
          dayOfWeek,
          startDate: end ? LessThan(end) : undefined,
          endDate: start ? MoreThan(start) : undefined,
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
