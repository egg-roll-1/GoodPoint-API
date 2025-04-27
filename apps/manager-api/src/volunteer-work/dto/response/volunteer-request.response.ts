import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

import { VolunteerRequest } from '@core/domain/volunteer-request/entity/volunteer-request.entity';
import { VolunteerRequestStatus } from '@core/domain/volunteer-request/entity/volunteer-request.enum';

export class VolunteerRequestResponse {
  @ApiProperty({ description: '신청내역 id' })
  id: number;

  @ApiProperty({
    description: '신청상태',
    type: 'enum',
    enum: VolunteerRequestStatus,
  })
  status: VolunteerRequestStatus;

  @ApiProperty({ description: '사용자 ID' })
  userId: number;

  @ApiProperty({ description: '사용자 이름' })
  name: string;

  @ApiProperty({ description: '사용자 연락처' })
  phoneNumber: string;

  static async from(request: VolunteerRequest) {
    const user = await request.user;
    const dto = Builder(VolunteerRequestResponse)
      .id(request.id)
      .status(request.status)
      .userId(user.id)
      .name(user.name)
      .phoneNumber(user.phoneNumber)
      .build();

    return dto;
  }

  static async fromArray(requestList: VolunteerRequest[]) {
    const result: VolunteerRequestResponse[] = [];
    for (const entity of requestList) {
      result.push(await VolunteerRequestResponse.from(entity));
    }
    return result;
  }
}
