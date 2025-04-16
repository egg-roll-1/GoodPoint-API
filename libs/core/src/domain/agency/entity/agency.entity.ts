import { Manager } from '@core/domain/manager/entity/manager.entity';
import { EGBaseEntity } from '@core/global/entity/base.entity';
import { Builder } from 'builder-pattern';
import { VolunteerWork } from 'libs/core/src/domain/volunteer-work/entity/volunteer-work.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'agency' })
export class Agency extends EGBaseEntity {
  @PrimaryGeneratedColumn({ name: 'agency_id' })
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'manager_name' })
  managerName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'max_people_count' })
  maxPeopleCount: number;

  @OneToMany(() => VolunteerWork, (work) => work.agency)
  volunteerWork: VolunteerWork[];

  @OneToMany(() => Manager, (manager) => manager.agency)
  managerList: Manager[];

  @Column({ name: 'owner_manager_id', nullable: true })
  ownerManagerId: number;

  /** 생성메서드 */
  static createOne(
    object: Pick<
      Agency,
      | 'title'
      | 'type'
      | 'phoneNumber'
      | 'managerName'
      | 'email'
      | 'maxPeopleCount'
      | 'ownerManagerId'
    > &
      Partial<Agency>,
  ) {
    return Builder(Agency)
      .id(object.id)
      .title(object.title)
      .type(object.type)
      .phoneNumber(object.phoneNumber)
      .managerName(object.managerName)
      .email(object.email)
      .maxPeopleCount(object.maxPeopleCount)
      .ownerManagerId(object.ownerManagerId)
      .build();
  }
}
