import { DayOfWeek } from '@core/domain/enum/day.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import { VolunteerWork } from 'libs/core/src/domain/volunteer-work/entity/volunteer-work.entity';

export class VolunteerWorkResponse {
  @ApiProperty({ description: '봉사활동 ID' })
  id: number;

  @ApiProperty({ description: '봉사활동 시작일' })
  startDate: Date;

  @ApiProperty({ description: '봉사활동 종료일' })
  endDate: Date;

  @ApiProperty({ description: '봉사활동 모집 시작일' })
  recruitStartDate: Date;

  @ApiProperty({ description: '봉사활동 모집 종료일' })
  recruitEndDate: Date;

  @ApiProperty({ description: '봉사활동 요일' })
  dayOfWeek: DayOfWeek[];

  @ApiProperty({ description: '봉사활동 인원' })
  peopleCount: number;

  @ApiProperty({ description: '봉사활동 모집인원' })
  recruitPeopleCount: number;

  @ApiProperty({ description: '봉사활동 주소지' })
  workAddress: string;

  @ApiProperty({ description: '활동공간 이름' })
  workPlace: string;

  @ApiProperty({ description: '위도' })
  latitude: string;

  @ApiProperty({ description: '경도' })
  longitude: string;

  static from(volunteerWork: VolunteerWork) {
    return Builder(VolunteerWorkResponse)
      .id(volunteerWork.id)
      .startDate(volunteerWork.startDate)
      .endDate(volunteerWork.endDate)
      .recruitStartDate(volunteerWork.recruitStartDate)
      .recruitEndDate(volunteerWork.recruitEndDate)
      .dayOfWeek(volunteerWork.dayOfWeek)
      .peopleCount(volunteerWork.peopleCount)
      .recruitPeopleCount(volunteerWork.recruitPeopleCount)
      .workAddress(volunteerWork.workAddress)
      .workPlace(volunteerWork.workPlace)
      .latitude(volunteerWork.latitude)
      .longitude(volunteerWork.longitude)
      .build();
  }

  static fromArray(entityList: VolunteerWork[]) {
    const result: VolunteerWorkResponse[] = [];
    for (const entity of entityList) {
      result.push(VolunteerWorkResponse.from(entity));
    }
    return result;
  }
}
