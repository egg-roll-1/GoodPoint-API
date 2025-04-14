import { VolunteerWorkStatus } from '@core/domain/volunteer-work/entity/volunteer-work.enum';
import { PagingRequest } from '@core/global/dto/request/paging.request';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class GetVolunteerRequest extends PagingRequest {
  @ApiPropertyOptional({ description: '상태' })
  @IsOptional()
  @IsArray()
  @IsEnum(VolunteerWorkStatus, { each: true })
  @Transform(({ value }) => value.split(','))
  status?: VolunteerWorkStatus[];

  @ApiPropertyOptional({ description: '위도' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  latitude?: number;

  @ApiPropertyOptional({ description: '경도' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  longitude?: number;
}
