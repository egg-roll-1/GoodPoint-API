import { Authority } from '@core/domain/user/entity/user.enum';
import { Builder } from 'builder-pattern';

export class TokenUserDto {
  id: number;
  authority: Authority;

  static createOne(object: Pick<TokenUserDto, 'id' | 'authority'>) {
    return Builder(TokenUserDto)
      .id(object.id)
      .authority(object.authority)
      .build();
  }
}
