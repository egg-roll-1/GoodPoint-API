import { VolunteerWork } from 'src/domain/volunteer-work/entity/volunteer-work.entity';
import { EGBaseEntity } from 'src/global/entity/base.entity';
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
}
