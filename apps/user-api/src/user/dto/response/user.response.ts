import { User } from '@core/domain/user/entity/user.entity';
import { Gender } from '@core/domain/user/entity/user.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

export class UserResponse {
  @ApiProperty({ description: '사용자 ID' })
  id: number;

  @ApiProperty({ description: '이름' })
  name: string;

  @ApiProperty({ description: '전화번호' })
  phoneNumber: string;

  @ApiProperty({ description: '성별', type: 'enum', enum: Gender })
  gender: Gender;

  @ApiProperty({ description: '크레딧 잔액' })
  creditBalance: number;

  @ApiProperty({ description: '나이' })
  age: number;

  static from(user: User) {
    const balance = user.creditHistory.reduce((acc, x) => acc + x.amount, 0);

    return Builder(UserResponse)
      .id(user.id)
      .name(user.name)
      .phoneNumber(user.phoneNumber)
      .gender(user.gender)
      .creditBalance(balance)
      .age(user.age)
      .build();
  }
}
