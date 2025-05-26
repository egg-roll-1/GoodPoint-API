import { Manager } from '@core/domain/manager/entity/manager.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

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

  toEntity(exist: Manager) {
    return Manager.create({
      id: exist.id,
      name: this.username ?? exist.name,
      phoneNumber: this.phoneNumber ?? exist.phoneNumber,
      password: exist.password,
    });
  }
}
