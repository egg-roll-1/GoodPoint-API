import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { User } from 'libs/core/src/domain/user/entity/user.entity';
import { Gender } from 'libs/core/src/domain/user/entity/user.enum';

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

  @ApiProperty({ description: '나이' })
  @IsNumber()
  @Min(0)
  age: number;

  @ApiProperty({ description: '성별', type: 'enum', enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  /** 엔티티 변환 메서드 */
  toEntity(encryptedPassword: string) {
    return User.create({
      name: this.name,
      phoneNumber: this.phoneNumber,
      password: encryptedPassword,
      age: this.age,
      gender: this.gender,
    });
  }
}
