import { DayOfWeek } from '@core/domain/enum/day.enum';
import { VolunteerRequestStatus } from '@core/domain/volunteer-request/entity/volunteer-request.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
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
  @Transform(({ value }) => value?.split(','))
  status?: VolunteerRequestStatus[];

  @ApiPropertyOptional({ description: '봉사활동 ID' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  volunteerWorkId?: number;

  @ApiPropertyOptional({ description: '봉사활동 요일' })
  @IsOptional()
  @IsEnum(DayOfWeek)
  dayOfWeek?: DayOfWeek;

  @ApiPropertyOptional({ description: '봉사활동 시작 기간' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  start?: Date;

  @ApiPropertyOptional({ description: '봉사활동 종료 기간' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  end?: Date;
}
