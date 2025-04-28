import { User } from '@core/domain/user/entity/user.entity';
import { VolunteerHistory } from '@core/domain/volunteer-history/entity/volunteer-history.entity';
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

@Entity({ name: 'credit_history' })
export class CreditHistory extends EGBaseEntity {
  @PrimaryGeneratedColumn({ name: 'credit_history_id' })
  id: number;

  @Column({ name: 'amount' })
  amount: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;

  @Column({ name: 'user_id', default: null })
  userId: number;

  @OneToOne(() => VolunteerHistory, (history) => history.creditHistory)
  volunteerHistory: Promise<VolunteerHistory>;

  @Column({ name: 'expired_at' })
  expiredAt: Date;

  /** 생성 메서드 */
  static create(
    object: Pick<CreditHistory, 'amount' | 'userId'> & Partial<CreditHistory>,
  ) {
    return Builder(CreditHistory)
      .id(object.id)
      .amount(object.amount)
      .userId(object.userId)
      .expiredAt(object.expiredAt ?? dayjs().add(3, 'year').toDate())
      .build();
  }
}
