import { User } from '@core/domain/user/entity/user.entity';
import { VolunteerHistory } from '@core/domain/volunteer-history/entity/volunteer-history.entity';
import { EGBaseEntity } from '@core/global/entity/base.entity';
import { Builder } from 'builder-pattern';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => VolunteerHistory)
  @JoinColumn({ name: 'volunteer_history_id' })
  volunteerHistory: Promise<VolunteerHistory>;

  @Column({ name: 'volunteer_history_id', nullable: true })
  volunteerHistoryId: number;

  /** 생성 메서드 */
  static create(
    object: Pick<CreditHistory, 'amount' | 'userId'> & Partial<CreditHistory>,
  ) {
    return Builder(CreditHistory)
      .id(object.id)
      .amount(object.amount)
      .userId(object.userId)
      .volunteerHistoryId(object.volunteerHistoryId)
      .build();
  }
}
