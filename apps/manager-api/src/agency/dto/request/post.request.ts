import { Agency } from '@core/domain/agency/entity/agency.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class PostAgencyRequest {
  @ApiProperty({ description: '봉사기관명' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  title: string;

  @ApiProperty({ description: '지자체명' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  nationAgency: string;

  toEntity(ownerManagerId: number) {
    return Agency.createOne({ ...this, ownerManagerId });
  }
}
