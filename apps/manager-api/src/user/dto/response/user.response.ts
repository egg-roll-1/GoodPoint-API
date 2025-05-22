import { Manager } from '@core/domain/manager/entity/manager.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

export class UserResponse {
  @ApiProperty({ description: '사용자 ID' })
  id: number;

  @ApiProperty({ description: '이름' })
  name: string;

  @ApiProperty({ description: '전화번호' })
  phoneNumber: string;

  static from(user: Manager) {
    return Builder(UserResponse)
      .id(user.id)
      .name(user.name)
      .phoneNumber(user.phoneNumber)
      .build();
  }
}
