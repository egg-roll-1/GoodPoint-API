import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import { User } from '../../entity/user.entity';
import { Gender } from '../../entity/user.enum';
import { Interest } from '../../../../global/enum/interest.enum';

export class UserResponse {
  @ApiProperty({ description: '사용자 ID' })
  id: number;

  @ApiProperty({ description: '이름' })
  name: string;

  @ApiProperty({ description: '전화번호' })
  phoneNumber: string;

  @ApiProperty({ description: '성별', type: 'enum', enum: Gender })
  gender: Gender;

  @ApiProperty({
    description: '관심분야 배열',
    type: 'enum',
    enum: Interest,
    isArray: true,
  })
  interest: Interest[];

  static from(entity: User) {
    return Builder(UserResponse)
      .id(entity.id)
      .name(entity.name)
      .phoneNumber(entity.phoneNumber)
      .gender(entity.gender)
      .interest(entity.interest)
      .build();
  }
}
