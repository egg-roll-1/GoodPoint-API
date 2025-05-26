import { Manager } from '@core/domain/manager/entity/manager.entity';
import { Gender } from '@core/domain/user/entity/user.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class PatchManagerRequest {
  @ApiPropertyOptional({ description: '이름' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  username?: string;

  @ApiPropertyOptional({ description: '전화번호' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, { message: '전화번호는 숫자만 포함해야 합니다.' })
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ description: '나이' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  age?: number;

  @ApiProperty({ description: '성별', type: 'enum', enum: Gender })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  toEntity(exist: Manager) {
    return Manager.create({
      id: exist.id,
      name: this.username ?? exist.name,
      phoneNumber: this.phoneNumber ?? exist.phoneNumber,
      age: this.age ?? exist.age,
      gender: this.gender ?? exist.gender,
      password: exist.password,
    });
  }
}
