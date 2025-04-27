import { DayOfWeek } from '@core/domain/enum/day.enum';
import { Interest } from '@core/domain/enum/interest.enum';
import { VolunteerRequestStatus } from '@core/domain/volunteer-request/entity/volunteer-request.enum';
import { VolunteerWork } from '@core/domain/volunteer-work/entity/volunteer-work.entity';
import { TargetType } from '@core/domain/volunteer-work/entity/volunteer-work.enum';
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

export class VolunteerWorkResponse {
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

  @ApiProperty({ description: '현재 신청한 봉사활동 인원' })
  currentPeopleCont: number;

  @ApiProperty({ description: '봉사 안내' })
  @MaxLength(1000)
  @IsString()
  @IsOptional()
  notice: string;

  @ApiProperty({ description: '봉사분야', type: 'enum', enum: Interest })
  @IsEnum(Interest)
  interest: Interest;

  @ApiProperty({ description: '봉사대상', type: 'enum', enum: TargetType })
  @IsEnum(TargetType)
  targetType: TargetType;

  @ApiProperty({ description: '봉사활동 주소 - 서울특별시 동작구 ...' })
  @IsNotEmpty()
  @IsString()
  workAddress: string;

  @ApiProperty({ description: '봉사활동 장소 - 정보과학관' })
  @IsNotEmpty()
  @IsString()
  workPlace: string;

  static from(volunteerWork: VolunteerWork) {
    const ignoreRequestStatus = new Set([
      VolunteerRequestStatus.Canceled,
      VolunteerRequestStatus.Reject,
    ]);

    return Builder(VolunteerWorkResponse)
      .id(volunteerWork.id)
      .agencyId(volunteerWork.agencyId)
      .startDate(volunteerWork.startDate)
      .endDate(volunteerWork.endDate)
      .startMinute(volunteerWork.startMinute)
      .endMinute(volunteerWork.endMinute)
      .recruitStartDate(volunteerWork.recruitStartDate)
      .recruitEndDate(volunteerWork.recruitEndDate)
      .dayOfWeek(volunteerWork.dayOfWeek)
      .peopleCount(volunteerWork.peopleCount)
      .recruitPeopleCount(volunteerWork.recruitPeopleCount)
      .currentPeopleCont(
        volunteerWork.volunteerRequestList.filter(
          (x) => !ignoreRequestStatus.has(x.status),
        ).length,
      )
      .notice(volunteerWork.notice)
      .interest(volunteerWork.interest)
      .targetType(volunteerWork.targetType)
      .workAddress(volunteerWork.workAddress)
      .workPlace(volunteerWork.workPlace)
      .build();
  }

  static fromArray(volunteerWorkList: VolunteerWork[]) {
    const result: VolunteerWorkResponse[] = [];
    for (const volunteerWork of volunteerWorkList) {
      result.push(VolunteerWorkResponse.from(volunteerWork));
    }
    return result;
  }
}
