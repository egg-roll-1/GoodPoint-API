import { Manager } from '@core/domain/manager/entity/manager.entity';
import { Gender } from '@core/domain/user/entity/user.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
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

  @ApiProperty({ description: '나이' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  age?: number;

  @ApiProperty({ description: '성별', type: 'enum', enum: Gender })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  /** 엔티티 변환 메서드 */
  toEntity(encryptedPassword: string) {
    return Manager.create({
      name: this.name,
      phoneNumber: this.phoneNumber,
      password: encryptedPassword,
      age: this.age,
      gender: this.gender,
    });
  }
}
