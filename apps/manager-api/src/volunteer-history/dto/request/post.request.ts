import { VolunteerHistory } from '@core/domain/volunteer-history/entity/volunteer-history.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class PostVolunteerHistoryRequest {
  @ApiProperty({ description: '봉사활동 ID' })
  @IsNumber()
  volunteerWorkId: number;

  @ApiProperty({ description: '봉사활동 인정 시작시간' })
  @IsDate()
  @Type(() => Date)
  startDateTime: Date;

  @ApiProperty({ description: '봉사활동 인정 종료시간' })
  @IsDate()
  @Type(() => Date)
  endDateTime: Date;

  @ApiProperty({ description: '사용자 ID' })
  @IsNumber()
  userId: number;

  toEntity() {
    return VolunteerHistory.createOne({
      volunteerWorkId: this.volunteerWorkId,
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime,
      userId: this.userId,
    });
  }
}
