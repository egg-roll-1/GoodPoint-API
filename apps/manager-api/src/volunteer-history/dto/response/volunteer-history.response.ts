import { VolunteerHistory } from '@core/domain/volunteer-history/entity/volunteer-history.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import { VolunteerWorkResponse } from './volunteer-work.response';

export class VolunteerHistoryResponse {
  @ApiProperty({ description: '활동기록 ID' })
  id: number;

  @ApiProperty({ description: '시작시간' })
  startDateTime: Date;

  @ApiProperty({ description: '종료시간' })
  endDateTime: Date;

  @ApiProperty({ description: '인정시간 (분)' })
  minute: number;

  @ApiProperty({ description: '사용자 ID' })
  userId: number;

  @ApiProperty({ description: '이름' })
  username: string;

  @ApiProperty({ description: '전화번호' })
  userPhoneNumber: string;

  @ApiProperty({ description: '봉사활동', type: VolunteerWorkResponse })
  volunteerWork: VolunteerWorkResponse;

  static async from(history: VolunteerHistory) {
    const user = await history.user;
    const volunteerWork = await history.volunteerWork;

    const dto = Builder(VolunteerHistoryResponse)
      .id(history.id)
      .userId(user.id)
      .username(user.name)
      .userPhoneNumber(user.phoneNumber)
      .startDateTime(history.startDateTime)
      .endDateTime(history.endDateTime)
      .minute(history.minute)
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
