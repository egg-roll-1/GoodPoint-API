import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import dayjs from 'dayjs';

export class GetVolunteerHistoryRequest {
  @ApiProperty({ description: '봉사활동 ID' })
  @IsNumber()
  @Type(() => Number)
  volunteerWorkId: number;

  @ApiPropertyOptional({ description: '조회 시작시간 - 기본값은 3개월 전' })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDateTime?: Date = dayjs().subtract(3, 'month').toDate();

  @ApiPropertyOptional({ description: '조회 종료시간 - 기본값은 오늘' })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDateTime?: Date = dayjs().add(3, 'month').toDate();
}
