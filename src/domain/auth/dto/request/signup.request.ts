import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { User } from 'src/domain/user/entity/user.entity';
import { Gender } from 'src/domain/user/entity/user.enum';
import { Interest } from 'src/global/enum/interest.enum';

export class SignUpRequest {
  @ApiProperty({ description: '전화번호' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  @IsNotEmpty()
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

  @ApiProperty({
    description: '성별',
    type: 'enum',
    enum: Interest,
    isArray: true,
  })
  @IsEnum(Interest, { each: true })
  interest: Interest[];

  /** 엔티티 변환 메서드 */
  toEntity() {
    return User.create({
      name: this.name,
      phoneNumber: this.phoneNumber,
      password: this.password,
      age: this.age,
      gender: this.gender,
      interest: this.interest,
    });
  }
}
