import { Controller } from '@nestjs/common';
import { VolunteerWorkService } from '../service/volunteer-work.service';

@Controller('/volunteer-work')
export class VolunteerWorkController {
  constructor(private readonly volunteerWorkService: VolunteerWorkService) {}
}
