import { Agency } from '@core/domain/agency/entity/agency.entity';
import { Authority } from '@core/domain/user/entity/user.enum';
import { EGBaseEntity } from '@core/global/entity/base.entity';
import { Builder } from 'builder-pattern';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'manager' })
export class Manager extends EGBaseEntity {
  @PrimaryGeneratedColumn({ name: 'manager_id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Index()
  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'authority', default: Authority.ROLE_MANAGER })
  authority: Authority = Authority.ROLE_MANAGER;

  @ManyToOne(() => Agency, (agency) => agency.managerList)
  @JoinColumn({ name: 'agency_id' })
  agency: Promise<Agency>;

  @Column({ name: 'agency_id', nullable: true })
  agencyId: number;

  /** 생성 메서드 */
  private static builder() {
    return Builder(Manager);
  }

  static create(
    object: Pick<Manager, 'name' | 'phoneNumber' | 'password'> &
      Partial<Manager>,
  ) {
    return Manager.builder()
      .id(object.id)
      .name(object.name)
      .phoneNumber(object.phoneNumber)
      .password(object.password)
      .agencyId(object.agencyId)
      .build();
  }
}
