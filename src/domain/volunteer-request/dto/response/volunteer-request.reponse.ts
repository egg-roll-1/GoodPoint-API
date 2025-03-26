import { Builder } from 'builder-pattern';
import { VolunteerRequest } from '../../entity/volunteer-request.entity';
import { VolunteerWorkStatus } from '../../entity/volunteer-request.enum';

export class VolunteerRequestResponse {
  userVolunteerWork: number;

  status: VolunteerWorkStatus;

  //   volunteerWork: VolunteerWork[];

  static from(entity: VolunteerRequest) {
    const dto = Builder(VolunteerRequestResponse)
      .userVolunteerWork(entity.userVolunteerWork)
      .status(entity.status)
      .build();

    return dto;
  }
}
