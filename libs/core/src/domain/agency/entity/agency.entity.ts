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

  @Column({ name: 'nation_agency', nullable: true })
  nationAgency: string;

  @OneToMany(() => VolunteerWork, (work) => work.agency)
  volunteerWork: VolunteerWork[];

  @OneToMany(() => Manager, (manager) => manager.agency)
  managerList: Manager[];

  @Column({ name: 'owner_manager_id', nullable: true })
  ownerManagerId: number;

  /** 생성메서드 */
  static createOne(
    object: Pick<Agency, 'title' | 'nationAgency'> & Partial<Agency>,
  ) {
    return Builder(Agency)
      .id(object.id)
      .title(object.title)
      .nationAgency(object.nationAgency)
      .ownerManagerId(object.ownerManagerId)
      .build();
  }
}
