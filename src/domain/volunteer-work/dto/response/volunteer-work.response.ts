import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import { VolunteerWork } from 'src/domain/volunteer-work/entity/volunteer-work.entity';
import { DayOfWeek } from 'src/global/enum/day.enum';

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

  @ApiProperty({ description: '봉사기관 ID' })
  agencyId: number;

  @ApiProperty({ description: '봉사기관명' })
  agencyTitle: string;

  @ApiProperty({ description: '봉사기관 - 연락처' })
  agencyPhoneNumber: string;

  @ApiProperty({ description: '봉사기관 - 이메일' })
  agencyEmail: string;

  static async from(volunteerWork: VolunteerWork) {
    const agency = await volunteerWork.agency;
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
      .agencyId(agency.id)
      .agencyTitle(agency.title)
      .agencyPhoneNumber(agency.phoneNumber)
      .agencyEmail(agency.email)
      .build();
  }

  static async fromArray(entityList: VolunteerWork[]) {
    const result: VolunteerWorkResponse[] = [];
    for (const entity of entityList) {
      result.push(await VolunteerWorkResponse.from(entity));
    }
    return result;
  }
}
