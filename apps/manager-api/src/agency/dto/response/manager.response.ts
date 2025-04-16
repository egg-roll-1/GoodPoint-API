import { Manager } from '@core/domain/manager/entity/manager.entity';
import { Builder } from 'builder-pattern';

export class ManagerResponse {
  id: number;
  email: string;
  name: string;

  static from(manager: Manager) {
    return Builder(ManagerResponse)
      .id(manager.id)
      .email(manager.phoneNumber)
      .name(manager.name)
      .build();
  }

  static fromArray(managerList: Manager[]) {
    const result: ManagerResponse[] = [];
    for (const manager of managerList.filter((x) => !x.isRemoved)) {
      result.push(ManagerResponse.from(manager));
    }
    return result;
  }
}
