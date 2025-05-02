import { DayOfWeek } from '@core/domain/enum/day.enum';
import { VolunteerRequestStatus } from '@core/domain/volunteer-request/entity/volunteer-request.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import { VolunteerWork } from 'libs/core/src/domain/volunteer-work/entity/volunteer-work.entity';
import { TagResponse } from './tag.response';

export class VolunteerWorkResponse {
  @ApiProperty({ description: '봉사활동 ID' })
  id: number;

  @ApiProperty({ description: '봉사활동 시작일' })
  startDate: Date;

  @ApiProperty({ description: '봉사활동 종료일' })
  endDate: Date;

  @ApiProperty({ description: '봉사활동 시작시간' })
  startMinute: number;

  @ApiProperty({ description: '봉사활동 종료시간' })
  endMinute: number;

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

  @ApiProperty({ description: '태그', type: TagResponse, isArray: true })
  tagList: TagResponse[];

  static async from(volunteerWork: VolunteerWork) {
    const agency = await volunteerWork.agency;
    const manager = agency.managerList[0];
    const tagList = await Promise.all(
      volunteerWork.tagList.map(async (x) => await x.tag),
    );

    const ignoreRequestStatus = new Set([
      VolunteerRequestStatus.Canceled,
      VolunteerRequestStatus.Reject,
    ]);

    return Builder(VolunteerWorkResponse)
      .id(volunteerWork.id)
      .startDate(volunteerWork.startDate)
      .endDate(volunteerWork.endDate)
      .startMinute(volunteerWork.startMinute)
      .endMinute(volunteerWork.endMinute)
      .recruitStartDate(volunteerWork.recruitStartDate)
      .recruitEndDate(volunteerWork.recruitEndDate)
      .dayOfWeek(volunteerWork.dayOfWeek)
      .peopleCount(
        volunteerWork.volunteerRequestList.filter(
          (x) => !ignoreRequestStatus.has(x.status),
        ).length,
      )
      .recruitPeopleCount(volunteerWork.recruitPeopleCount)
      .workAddress(volunteerWork.workAddress)
      .workPlace(volunteerWork.workPlace)
      .latitude(volunteerWork.latitude)
      .longitude(volunteerWork.longitude)
      .agencyId(agency.id)
      .agencyTitle(agency.title)
      .agencyPhoneNumber(manager.phoneNumber)
      .tagList(TagResponse.fromArray(tagList))
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
