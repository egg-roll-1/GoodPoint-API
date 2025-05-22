import { VolunteerHistory } from '@core/domain/volunteer-history/entity/volunteer-history.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import { CreditHistoryResponse } from './credit.response';
import { VolunteerWorkResponse } from './volunteer-work.response';

export class VolunteerHistoryResponse {
  @ApiProperty({ description: '활동기록 ID' })
  id: number;

  @ApiProperty({ description: '시작시간' })
  startDateTime: Date;

  @ApiProperty({ description: '종료시간' })
  endDateTime: Date;

  @ApiProperty({ description: '인정시간(분)' })
  minute: number;

  @ApiProperty({ description: '크레딧' })
  credit: CreditHistoryResponse;

  @ApiProperty({ description: '봉사활동', type: VolunteerWorkResponse })
  volunteerWork: VolunteerWorkResponse;

  static async from(history: VolunteerHistory) {
    const creditHistory = await history.creditHistory;
    const volunteerWork = await history.volunteerWork;

    const dto = Builder(VolunteerHistoryResponse)
      .id(history.id)
      .startDateTime(history.startDateTime)
      .endDateTime(history.endDateTime)
      .minute(history.minute)
      .credit(CreditHistoryResponse.from(creditHistory))
      .volunteerWork(VolunteerWorkResponse.from(volunteerWork))
      .build();

    return dto;
  }

  static async fromArray(historyList: VolunteerHistory[]) {
    const result: VolunteerHistoryResponse[] = [];
    for (const history of historyList) {
      result.push(await VolunteerHistoryResponse.from(history));
    }
    return result;
  }
}
