import { VolunteerHistory } from '@core/domain/volunteer-history/entity/volunteer-history.entity';
import { VolunteerHistoryStatus } from '@core/domain/volunteer-history/entity/volunteer-history.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

export class VolunteerHistoryResponse {
  @ApiProperty({ description: '활동기록 ID' })
  id: number;

  @ApiProperty({
    description: '상태',
    type: 'enum',
    enum: VolunteerHistoryStatus,
  })
  status: VolunteerHistoryStatus;

  @ApiProperty({ description: '시작시간' })
  startDateTime: Date;

  @ApiProperty({ description: '종료시간' })
  endDateTime: Date;

  @ApiProperty({ description: '인정시간' })
  hour: number;

  static from(history: VolunteerHistory) {
    const dto = Builder(VolunteerHistoryResponse)
      .id(history.id)
      .status(history.status)
      .startDateTime(history.startDateTime)
      .endDateTime(history.endDateTime)
      .hour(history.hour)
      .build();

    return dto;
  }

  static fromArray(historyList: VolunteerHistory[]) {
    const result: VolunteerHistoryResponse[] = [];
    for (const history of historyList) {
      result.push(VolunteerHistoryResponse.from(history));
    }
    return result;
  }
}
