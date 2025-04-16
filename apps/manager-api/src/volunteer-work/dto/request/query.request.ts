import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetVolunteerWorkRequest {
  @ApiProperty({ description: '봉사기관 ID' })
  @IsInt()
  @Type(() => Number)
  agencyId: number;
}
