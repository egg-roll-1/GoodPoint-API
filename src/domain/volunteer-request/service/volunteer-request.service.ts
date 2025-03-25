import { Injectable } from '@nestjs/common';
import { VolunteerRequestRepository } from '../repository/volunteer-request.repository';

@Injectable()
export class VolunteerRequestService {
  constructor(private volunteerRequestRepository: VolunteerRequestRepository) {}
}
