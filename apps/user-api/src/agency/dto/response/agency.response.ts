import { Agency } from '@core/domain/agency/entity/agency.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

export class AgencyResponse {
  @ApiProperty({ description: '봉사기관 ID' })
  id: number;

  @ApiProperty({ description: '봉사기관명' })
  title: string;

  @ApiProperty({ description: '봉사기관 유형' })
  type: string;

  @ApiProperty({ description: '봉사기관 - 연락처' })
  phoneNumber: string;

  @ApiProperty({ description: '봉사기관 - 관리자명' })
  managerName: string;

  @ApiProperty({ description: '봉사기관 - 이메일' })
  email: string;

  @ApiProperty({ description: '봉사기관 - 최대인원' })
  maxPeopleCount: number;

  static from(entity: Agency) {
    const dto = Builder(AgencyResponse)
      .id(entity.id)
      .title(entity.title)
      .type(entity.type)
      .phoneNumber(entity.phoneNumber)
      .managerName(entity.managerName)
      .email(entity.email)
      .maxPeopleCount(entity.maxPeopleCount)
      .build();

    return dto;
  }
}
