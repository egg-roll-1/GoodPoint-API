import { Tag } from '@core/domain/tag/entity/tag.entity';
import { EGBaseEntity } from '@core/global/entity/base.entity';
import { Builder } from 'builder-pattern';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VolunteerWork } from './volunteer-work.entity';

@Entity({ name: 'volunteer_tag' })
export class VolunteerTag extends EGBaseEntity {
  @PrimaryGeneratedColumn({ name: 'volunteer_tag_id' })
  id: number;

  @ManyToOne(() => VolunteerWork)
  @JoinColumn({ name: 'volunteer_work_id' })
  volunteerWork: Promise<VolunteerWork>;

  @Column({ name: 'volunteer_work_id', nullable: true })
  volunteerWorkId: number;

  @ManyToOne(() => Tag)
  @JoinColumn({ name: 'tag_id' })
  tag: Promise<Tag>;

  @Column({ name: 'tag_id', nullable: true })
  tagId: number;

  /** 생성 메서드 */
  static create(
    object: Pick<VolunteerTag, 'volunteerWorkId' | 'tagId'> &
      Partial<VolunteerTag>,
  ) {
    return Builder(VolunteerTag)
      .id(object.id)
      .volunteerWorkId(object.volunteerWorkId)
      .tagId(object.tagId)
      .build();
  }
}
