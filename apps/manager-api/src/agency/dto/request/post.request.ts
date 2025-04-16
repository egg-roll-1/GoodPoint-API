import { Agency } from '@core/domain/agency/entity/agency.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class PostAgencyRequest {
  @ApiProperty({ description: '봉사기관명' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  title: string;

  @ApiProperty({ description: '봉사기관 유형' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  type: string;

  @ApiProperty({ description: '봉사기관 - 연락처' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  phoneNumber: string;

  @ApiProperty({ description: '봉사기관 - 관리자명' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  managerName: string;

  @ApiProperty({ description: '봉사기관 - 이메일' })
  @IsString()
  @MaxLength(30)
  @IsEmail()
  email: string;

  @ApiProperty({ description: '봉사기관 - 최대인원' })
  @Min(1)
  @IsInt()
  maxPeopleCount: number;

  toEntity(ownerManagerId: number) {
    return Agency.createOne({ ...this, ownerManagerId });
  }
}
