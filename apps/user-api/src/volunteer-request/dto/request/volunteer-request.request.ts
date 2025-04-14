import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class VolunteerApplyRequest {
  @ApiProperty({ description: '봉사활동 ID' })
  @IsNumber()
  volunteerWorkId: number;
}
