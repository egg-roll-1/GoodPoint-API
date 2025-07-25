import { EGBaseEntity } from '@core/global/entity/base.entity';
import { Builder } from 'builder-pattern';
import { User } from 'libs/core/src/domain/user/entity/user.entity';
import { VolunteerWork } from 'libs/core/src/domain/volunteer-work/entity/volunteer-work.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VolunteerRequestStatus } from './volunteer-request.enum';

@Entity({ name: 'volunteer_request' })
export class VolunteerRequest extends EGBaseEntity {
  @PrimaryGeneratedColumn({ name: 'volunteer_request_id' })
  id: number;

  @Column({ name: 'status', default: VolunteerRequestStatus.Wait })
  status: VolunteerRequestStatus;

  /** 연관관계 */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => VolunteerWork)
  @JoinColumn({ name: 'volunteer_work_id' })
  volunteerWork: Promise<VolunteerWork>;

  @Column({ name: 'volunteer_work_id', nullable: true })
  volunteerWorkId: number;

  static createOne(
    object: Pick<VolunteerRequest, 'userId' | 'volunteerWorkId'> &
      Partial<VolunteerRequest>,
  ) {
    return Builder(VolunteerRequest)
      .id(object.id)
      .status(object.status)
      .userId(object.userId)
      .volunteerWorkId(object.volunteerWorkId)
      .build();
  }
}
