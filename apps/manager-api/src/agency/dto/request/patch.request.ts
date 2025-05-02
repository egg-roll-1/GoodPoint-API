import { Agency } from '@core/domain/agency/entity/agency.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class PatchAgencyRequest {
  @ApiPropertyOptional({ description: '봉사기관명' })
  @IsString()
  @IsOptional()
  @MaxLength(30)
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: '지자체명' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @IsOptional()
  nationAgency?: string;

  toEntity(existAgency: Agency) {
    return Agency.createOne({
      id: existAgency.id,
      title: this.title ?? existAgency.title,
      nationAgency: this.nationAgency ?? existAgency.nationAgency,
      ownerManagerId: existAgency.ownerManagerId,
    });
  }
}
