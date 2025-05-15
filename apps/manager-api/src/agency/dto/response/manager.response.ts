import { Manager } from '@core/domain/manager/entity/manager.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

export class ManagerResponse {
  @ApiProperty({ description: '매니저 ID' })
  id: number;

  @ApiProperty({ description: '매니저 이메일' })
  email: string;

  @ApiProperty({ description: '매니저 이름' })
  name: string;

  @ApiProperty({ description: '대표 매니저' })
  isOwner: boolean;

  static from(manager: Manager, ownerManagerId: number) {
    return Builder(ManagerResponse)
      .id(manager.id)
      .email(manager.phoneNumber)
      .name(manager.name)
      .isOwner(manager.id === ownerManagerId)
      .build();
  }

  static fromArray(managerList: Manager[], ownerManagerId: number) {
    const result: ManagerResponse[] = [];
    for (const manager of managerList.filter((x) => !x.isRemoved)) {
      result.push(ManagerResponse.from(manager, ownerManagerId));
    }
    return result;
  }
}
