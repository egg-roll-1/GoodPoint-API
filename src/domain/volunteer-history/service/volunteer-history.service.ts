import { Injectable } from '@nestjs/common';
import { VolunteerHistoryRepository } from '../repository/volunteer-history.repository';

@Injectable()
export class VolunteerHistoryService {
  constructor(private volunteerHistoryRepository: VolunteerHistoryRepository) {}
}
