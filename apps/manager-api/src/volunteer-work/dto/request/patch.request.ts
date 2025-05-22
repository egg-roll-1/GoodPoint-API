import { DayOfWeek } from '@core/domain/enum/day.enum';
import { VolunteerWork } from '@core/domain/volunteer-work/entity/volunteer-work.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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

export class PatchVolunteerWorkRequest {
  @IsOptional()
  agencyId: number;

  @ApiPropertyOptional({ description: '봉사활동 제목' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: '봉사활동 시작일' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @ApiPropertyOptional({ description: '봉사활동 종료일' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @ApiPropertyOptional({ description: '시작시간' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1440)
  startMinute?: number;

  @ApiPropertyOptional({ description: '종료시간' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1440)
  endMinute?: number;

  @ApiPropertyOptional({ description: '모집 시작일' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  recruitStartDate?: Date;

  @ApiPropertyOptional({ description: '모집 종료일' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  recruitEndDate?: Date;

  @ApiPropertyOptional({
    description: '봉사활동 요일 목록',
    type: 'enum',
    enum: DayOfWeek,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(DayOfWeek, { each: true })
  dayOfWeek?: DayOfWeek[];

  @ApiPropertyOptional({ description: '모집 봉사활동 인원' })
  @IsInt()
  @Min(0)
  @IsOptional()
  recruitPeopleCount?: number;

  @ApiPropertyOptional({ description: '봉사 안내' })
  @MaxLength(1000)
  @IsString()
  @IsOptional()
  notice?: string;

  @ApiPropertyOptional({ description: '봉사활동 주소 - 서울특별시 동작구 ...' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  workAddress?: string;

  @ApiPropertyOptional({ description: '봉사활동 장소 - 정보과학관' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  workPlace?: string;

  toEntity(exist: VolunteerWork) {
    return VolunteerWork.createOne({
      id: exist.id,
      title: this.title ?? exist.title,
      startDate: this.startDate ?? exist.startDate,
      endDate: this.endDate ?? exist.endDate,
      startMinute: this.startMinute ?? exist.startMinute,
      endMinute: this.endMinute ?? exist.endMinute,
      recruitStartDate: this.recruitStartDate ?? exist.recruitStartDate,
      recruitEndDate: this.recruitEndDate ?? exist.recruitEndDate,
      dayOfWeek: this.dayOfWeek ?? exist.dayOfWeek,
      recruitPeopleCount: this.recruitPeopleCount ?? exist.recruitPeopleCount,
      notice: this.notice ?? exist.notice,
      workAddress: this.workAddress ?? exist.workAddress,
      workPlace: this.workPlace ?? exist.workPlace,
      longitude: exist.longitude,
      latitude: exist.latitude,
      agencyId: exist.agencyId,
    });
  }
}
