import { Builder } from 'builder-pattern';
import { Agency } from '../../entity/agency.entity';

export class AgencyResponse {
  id: number;

  title: string;

  type: string;

  phoneNumber: string;

  managerName: string;

  email: string;

  maxPeopleCount: number;

  //   volunteerWork: VolunteerWork[];

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
