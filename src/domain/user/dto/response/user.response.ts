import { Builder } from 'builder-pattern';
import { User } from '../entity/user.entity';

export class UserResponse {
  id: number;

  title: string;

  type: string;

  phoneNumber: string;

  managerName: string;

  email: string;

  maxPeopleCount: number;

  //   volunteerWork: VolunteerWork[];

  static from(entity: User) {
    const dto = Builder(UserResponse)
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
