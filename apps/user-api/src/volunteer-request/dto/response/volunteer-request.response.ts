import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

import { VolunteerRequest } from '@core/domain/volunteer-request/entity/volunteer-request.entity';
import { VolunteerRequestStatus } from '@core/domain/volunteer-request/entity/volunteer-request.enum';
import { VolunteerWorkResponse } from 'apps/user-api/src/volunteer-work/dto/response/volunteer-work.response';

export class VolunteerRequestResponse {
  @ApiProperty({ description: '신청내역 id' })
  id: number;

  @ApiProperty({
    description: '신청상태',
    type: 'enum',
    enum: VolunteerRequestStatus,
  })
  status: VolunteerRequestStatus;

  @ApiProperty({
    description: '신청한 봉사활동',
    type: () => VolunteerWorkResponse,
  })
  volunteerWork: VolunteerWorkResponse;

  static async from(entity: VolunteerRequest) {
    const volunteerWork = await entity.volunteerWork;
    const dto = Builder(VolunteerRequestResponse)
      .id(entity.id)
      .status(entity.status)
      .volunteerWork(await VolunteerWorkResponse.from(volunteerWork))
      .build();

    return dto;
  }

  static async fromArray(entityList: VolunteerRequest[]) {
    const result: VolunteerRequestResponse[] = [];
    for (const entity of entityList) {
      result.push(await VolunteerRequestResponse.from(entity));
    }
    return result;
  }
}
