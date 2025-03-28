import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

export class LoginResponse {
  @ApiProperty({ description: 'accessToken' })
  accessToken: string;

  static create(object: Pick<LoginResponse, 'accessToken'>) {
    return Builder(LoginResponse).accessToken(object.accessToken).build();
  }
}
