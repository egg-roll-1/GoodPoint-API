import { VolunteerHistoryRepository } from '@core/domain/volunteer-history/repository/volunteer-history.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VolunteerHistoryService {
  constructor(private volunteerHistoryRepository: VolunteerHistoryRepository) {}

  public async findHistory(userId: number) {
    return await this.volunteerHistoryRepository.find({
      relations: {
        volunteerWork: {
          volunteerRequestList: true,
        },
        creditHistory: true,
      },
      where: {
        userId,
      },
    });
  }
}
