import { VolunteerHistory } from '@core/domain/volunteer-history/entity/volunteer-history.entity';
import { VolunteerHistoryRepository } from '@core/domain/volunteer-history/repository/volunteer-history.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VolunteerHistoryService {
  constructor(private volunteerHistoryRepository: VolunteerHistoryRepository) {}

  async findHistory(userId: number): Promise<VolunteerHistory[]> {
    /** 조회 find */

    return [];
  }
}
