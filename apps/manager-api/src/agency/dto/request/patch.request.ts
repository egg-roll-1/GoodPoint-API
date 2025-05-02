import { Agency } from '@core/domain/agency/entity/agency.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class PatchAgencyRequest {
  @ApiPropertyOptional({ description: '봉사기관명' })
  @IsString()
  @IsOptional()
  @MaxLength(30)
  title?: string;

  @ApiPropertyOptional({ description: '봉사기관 유형' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  type: string;

  @ApiPropertyOptional({ description: '봉사기관 - 연락처' })
  @IsString()
  @MaxLength(30)
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ description: '봉사기관 - 관리자명' })
  @IsString()
  @IsOptional()
  @MaxLength(30)
  managerName?: string;

  @ApiPropertyOptional({ description: '봉사기관 - 이메일' })
  @IsString()
  @MaxLength(30)
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: '봉사기관 - 최대인원' })
  @Min(1)
  @IsOptional()
  @IsInt()
  maxPeopleCount?: number;

  toEntity(existAgency: Agency) {
    return Agency.createOne({
      id: existAgency.id,
      title: this.title ?? existAgency.title,
      nationAgency: this.type ?? existAgency.nationAgency,
      phoneNumber: this.phoneNumber ?? existAgency.phoneNumber,
      managerName: this.managerName ?? existAgency.managerName,
      email: this.email ?? existAgency.email,
      maxPeopleCount: this.maxPeopleCount ?? existAgency.maxPeopleCount,
      ownerManagerId: existAgency.ownerManagerId,
    });
  }
}
