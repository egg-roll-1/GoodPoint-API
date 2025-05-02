import { Agency } from '@core/domain/agency/entity/agency.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import { ManagerResponse } from './manager.response';

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

  @ApiProperty({ description: '매니저 목록' })
  managerList: ManagerResponse[];

  static from(agency: Agency) {
    const dto = Builder(AgencyResponse)
      .id(agency.id)
      .title(agency.title)
      .type(agency.nationAgency)
      .phoneNumber(agency.phoneNumber)
      .managerName(agency.managerName)
      .email(agency.email)
      .maxPeopleCount(agency.maxPeopleCount)
      .managerList(ManagerResponse.fromArray(agency.managerList))
      .build();

    return dto;
  }

  static fromArray(agencyList: Agency[]) {
    const result: AgencyResponse[] = [];
    for (const agency of agencyList.filter((x) => !x.isRemoved)) {
      result.push(AgencyResponse.from(agency));
    }
    return result;
  }
}
