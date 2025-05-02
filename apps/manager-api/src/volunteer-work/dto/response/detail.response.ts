import { DayOfWeek } from '@core/domain/enum/day.enum';
import { VolunteerRequestStatus } from '@core/domain/volunteer-request/entity/volunteer-request.enum';
import { VolunteerWork } from '@core/domain/volunteer-work/entity/volunteer-work.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { VolunteerRequestResponse } from './volunteer-request.response';

export class VolunteerWorkDetailResponse {
  @ApiProperty({ description: '봉사활동 ID' })
  id: number;

  @ApiProperty({ description: '봉사활동 기관 ID' })
  @IsInt()
  agencyId: number;

  @ApiProperty({ description: '봉사활동 시작일' })
  @IsDate()
  startDate: Date;

  @ApiProperty({ description: '봉사활동 종료일' })
  @IsDate()
  endDate: Date;

  @ApiProperty({ description: '시작시간' })
  @IsInt()
  @Min(0)
  @Max(1440)
  startMinute: number;

  @ApiProperty({ description: '종료시간' })
  @IsInt()
  @Min(0)
  @Max(1440)
  endMinute: number;

  @ApiProperty({ description: '모집 시작일' })
  @IsDate()
  recruitStartDate: Date;

  @ApiProperty({ description: '모집 종료일' })
  @IsDate()
  recruitEndDate: Date;

  @ApiProperty({
    description: '봉사활동 요일 목록',
    type: 'enum',
    enum: DayOfWeek,
    isArray: true,
  })
  @IsEnum(DayOfWeek, { each: true })
  dayOfWeek: DayOfWeek[];

  @ApiProperty({ description: '봉사활동 인원' })
  @IsInt()
  @Min(0)
  peopleCount: number;

  @ApiProperty({ description: '모집 봉사활동 인원' })
  @IsInt()
  @Min(0)
  recruitPeopleCount: number;

  @ApiProperty({ description: '봉사 안내' })
  @MaxLength(1000)
  @IsString()
  @IsOptional()
  notice: string;

  @ApiProperty({ description: '봉사활동 주소 - 서울특별시 동작구 ...' })
  @IsNotEmpty()
  @IsString()
  workAddress: string;

  @ApiProperty({ description: '봉사활동 장소 - 정보과학관' })
  @IsNotEmpty()
  @IsString()
  workPlace: string;

  @ApiProperty({
    description: '신청자 목록',
    type: VolunteerRequestResponse,
    isArray: true,
  })
  requestList: VolunteerRequestResponse[];

  static async from(volunteerWork: VolunteerWork) {
    const ignoreRequestStatus = new Set([
      VolunteerRequestStatus.Canceled,
      VolunteerRequestStatus.Reject,
    ]);

    return Builder(VolunteerWorkDetailResponse)
      .id(volunteerWork.id)
      .agencyId(volunteerWork.agencyId)
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
      .notice(volunteerWork.notice)
      .workAddress(volunteerWork.workAddress)
      .workPlace(volunteerWork.workPlace)
      .requestList(
        await VolunteerRequestResponse.fromArray(
          volunteerWork.volunteerRequestList,
        ),
      )
      .build();
  }

  static async fromArray(volunteerWorkList: VolunteerWork[]) {
    const result: VolunteerWorkDetailResponse[] = [];
    for (const volunteerWork of volunteerWorkList) {
      result.push(await VolunteerWorkDetailResponse.from(volunteerWork));
    }
    return result;
  }
}
