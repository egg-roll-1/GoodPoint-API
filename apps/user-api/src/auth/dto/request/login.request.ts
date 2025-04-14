import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID가 되는 전화번호' })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '비밀번호' })
  password: string;
}
