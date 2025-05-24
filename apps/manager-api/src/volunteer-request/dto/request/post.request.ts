import { VolunteerRequestStatus } from '@core/domain/volunteer-request/entity/volunteer-request.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class DecisionRequest {
  @ApiProperty({ description: '변경할 상태' })
  @IsEnum(VolunteerRequestStatus)
  status: VolunteerRequestStatus;
}
