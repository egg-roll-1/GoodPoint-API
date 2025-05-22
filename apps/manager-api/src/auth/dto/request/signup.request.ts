import { Manager } from '@core/domain/manager/entity/manager.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpRequest {
  @ApiProperty({ description: '전화번호' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, { message: '전화번호는 숫자만 포함해야 합니다.' })
  phoneNumber: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @ApiProperty({ description: '이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  /** 엔티티 변환 메서드 */
  toEntity(encryptedPassword: string) {
    return Manager.create({
      name: this.name,
      phoneNumber: this.phoneNumber,
      password: encryptedPassword,
    });
  }
}
