import { VolunteerHistoryRepository } from '@core/domain/volunteer-history/repository/volunteer-history.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VolunteerHistoryService {
  constructor(private volunteerHistoryRepository: VolunteerHistoryRepository) {}
}
