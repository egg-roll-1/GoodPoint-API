import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import { VolunteerRequest } from '../../entity/volunteer-request.entity';
import { VolunteerRequestStatus } from '../../entity/volunteer-request.enum';
import { VolunteerWorkResponse } from './volunteer-work.response';

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

  static from(entity: VolunteerRequest) {
    const volunteerWork = entity.volunteerWork;
    const dto = Builder(VolunteerRequestResponse)
      .id(entity.id)
      .status(entity.status)
      .volunteerWork(VolunteerWorkResponse.from(volunteerWork))
      .build();

    return dto;
  }

  static fromArray(entityList: VolunteerRequest[]) {
    const result: VolunteerRequestResponse[] = [];
    for (const entity of entityList) {
      result.push(VolunteerRequestResponse.from(entity));
    }
    return result;
  }
}
