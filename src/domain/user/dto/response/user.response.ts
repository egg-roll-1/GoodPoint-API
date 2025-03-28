import { Builder } from 'builder-pattern';
import { User } from '../../entity/user.entity';

export class UserResponse {
  id: number;

  name: string;

  phoneNumber: string;

  static from(entity: User) {
    return Builder(UserResponse)
      .id(entity.id)
      .name(entity.name)
      .phoneNumber(entity.phoneNumber)
      .build();
  }
}
