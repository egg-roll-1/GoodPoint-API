import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetVolunteerRequest {
  @ApiPropertyOptional({ description: '위도 - 기본값: 숭실대 위치' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  latitude?: number = 37.4963538;

  @ApiPropertyOptional({ description: '경도 - 기본값: 숭실대 위치' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  longitude?: number = 126.9572222;

  @ApiPropertyOptional({ description: '범위 - 기본값: 10' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  distanceKm: number = 10;

  @ApiPropertyOptional({ description: '검색어' })
  @IsOptional()
  @IsString()
  keyword?: string;
}
