import { CreditHistory } from '@core/domain/credit-history/entity/credit-history.entity';
import { User } from '@core/domain/user/entity/user.entity';
import { VolunteerWork } from '@core/domain/volunteer-work/entity/volunteer-work.entity';
import { EGBaseEntity } from '@core/global/entity/base.entity';
import { Builder } from 'builder-pattern';
import dayjs from 'dayjs';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'volunteer_history' })
export class VolunteerHistory extends EGBaseEntity {
  @PrimaryGeneratedColumn({ name: 'volunteer_history_id' })
  id: number;

  @Column({ name: 'start_date_time' })
  startDateTime: Date;

  @Column({ name: 'end_date_time' })
  endDateTime: Date;

  @Column({ name: 'minute' })
  minute: number;

  /*연관관계*/
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

  @OneToOne(() => CreditHistory, (credit) => credit.volunteerHistory)
  @JoinColumn({ name: 'credit_history_id' })
  creditHistory: Promise<CreditHistory>;

  @Column({ name: 'credit_history_id', nullable: true })
  creditHistoryId: number;

  static createOne(
    object: Pick<
      VolunteerHistory,
      'startDateTime' | 'endDateTime' | 'userId' | 'volunteerWorkId'
    > &
      Partial<VolunteerHistory>,
  ) {
    return Builder(VolunteerHistory)
      .id(object.id)
      .volunteerWorkId(object.volunteerWorkId)
      .userId(object.userId)
      .startDateTime(object.startDateTime)
      .endDateTime(object.endDateTime)
      .minute(
        object.minute ??
          dayjs(object.endDateTime).diff(object.startDateTime, 'minute'),
      )
      .build();
  }
}
