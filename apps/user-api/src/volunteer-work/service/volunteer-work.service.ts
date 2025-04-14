import { VolunteerWorkRepository } from '@core/domain/volunteer-work/repository/volunteer-work.repository';
import { Page } from '@core/global/dto/response/paging.response';
import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { GetVolunteerRequest } from '../dto/request/query.request';

@Injectable()
export class VolunteerWorkService {
  constructor(private volunteerWorkRepository: VolunteerWorkRepository) {}

  /**
   * @todo 위, 경도 기반 조회
   * @param request
   */
  async searchList(request: GetVolunteerRequest) {
    const { page, size, status } = request;
    const [content, total] = await this.volunteerWorkRepository.findAndCount({
      relations: {
        agency: true,
      },
      where: {
        status: status ? In(status) : undefined,
      },
      skip: (page - 1) * size,
      take: size,
    });

    return Page.createPageDto({ content, total, size, page });
  }
}
