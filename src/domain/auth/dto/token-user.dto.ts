import { Builder } from 'builder-pattern';

export class TokenUserDto {
  id: number;

  static createOne(object: Pick<TokenUserDto, 'id'>) {
    return Builder(TokenUserDto).id(object.id).build();
  }
}
