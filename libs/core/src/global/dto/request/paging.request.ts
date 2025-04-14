import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export const defaultPageNumber: number = 1;
export const defaultPageSize: number = 20;

export class PagingRequest {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = defaultPageNumber;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  size?: number = defaultPageSize;
}
