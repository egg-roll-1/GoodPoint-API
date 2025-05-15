import { DayOfWeek } from '@core/domain/enum/day.enum';
import { VolunteerRequestStatus } from '@core/domain/volunteer-request/entity/volunteer-request.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class GetVolunteerRequestQuery {
  @ApiPropertyOptional({
    description: '상태',
    type: 'enum',
    enum: VolunteerRequestStatus,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(VolunteerRequestStatus, { each: true })
  @IsArray()
  status?: VolunteerRequestStatus[];

  @ApiPropertyOptional({ description: '봉사활동 ID' })
  @IsOptional()
  @IsNumber()
  volunteerWorkId?: number;

  @ApiPropertyOptional({ description: '봉사활동 요일' })
  @IsOptional()
  @IsEnum(DayOfWeek)
  dayOfWeek?: DayOfWeek;

  @ApiPropertyOptional({ description: '봉사활동 시작 기간' })
  @IsOptional()
  @IsDate()
  start?: Date;

  @ApiPropertyOptional({ description: '봉사활동 종료 기간' })
  @IsOptional()
  @IsDate()
  end?: Date;
}
