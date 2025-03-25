import { Injectable } from '@nestjs/common';
import { VolunteerWorkRepository } from '../repository/volunteer-work.repository';

@Injectable()
export class VolunteerWorkService {
  constructor(private volunteerRepository: VolunteerWorkRepository) {}
  async test() {}
}
