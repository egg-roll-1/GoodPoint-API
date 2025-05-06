import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

export class LoginResponse {
  @ApiProperty({ description: 'accessToken' })
  accessToken: string;

  @ApiProperty({ description: '만료일' })
  expiredAt: Date;

  static create(object: Pick<LoginResponse, 'accessToken' | 'expiredAt'>) {
    return Builder(LoginResponse)
      .accessToken(object.accessToken)
      .expiredAt(object.expiredAt)
      .build();
  }
}
