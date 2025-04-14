import { VolunteerHistory } from '@core/domain/volunteer-history/entity/volunteer-history.entity';
import { VolunteerHistoryStatus } from '@core/domain/volunteer-history/entity/volunteer-history.enum';
import { Builder } from 'builder-pattern';

export class VolunteerHistoryResponse {
  id: number;

  status: VolunteerHistoryStatus;

  static from(entity: VolunteerHistory) {
    const dto = Builder(VolunteerHistoryResponse)
      .id(entity.id)
      .status(entity.status)
      .build();

    return dto;
  }
}
