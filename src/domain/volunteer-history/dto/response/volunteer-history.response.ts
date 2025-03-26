import { Builder } from 'builder-pattern';
import { VolunteerHistoryStatus } from '../../entity/volunteer-history.enum';
import { VolunteerHistory } from '../../entity/volunteer-history.entity';

export class VolunteerHistoryResponse {
  id: number;

  status: VolunteerHistoryStatus;

  //   volunteerWork: VolunteerWork[];

  static from(entity: VolunteerHistory) {
    const dto = Builder(VolunteerHistoryResponse)
      .id(entity.id)
      .status(entity.status)
      .build();

    return dto;
  }
}
