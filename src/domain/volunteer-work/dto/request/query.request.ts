import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { PagingRequest } from 'src/global/dto/request/paging.request';
import { VolunteerWorkStatus } from '../../entity/volunteer-work.enum';

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
