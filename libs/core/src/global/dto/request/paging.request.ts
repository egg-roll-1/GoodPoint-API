import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export const defaultPageNumber: number = 1;
export const defaultPageSize: number = 20;

export class PagingRequest {
  @ApiPropertyOptional({ description: '페이지', default: defaultPageNumber })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = defaultPageNumber;

  @ApiPropertyOptional({ description: '크기', default: defaultPageSize })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  size?: number = defaultPageSize;
}
