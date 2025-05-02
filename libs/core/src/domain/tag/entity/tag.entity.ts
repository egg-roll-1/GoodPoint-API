import { EGBaseEntity } from '@core/global/entity/base.entity';
import { Builder } from 'builder-pattern';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tag' })
export class Tag extends EGBaseEntity {
  @PrimaryGeneratedColumn({ name: 'tag_id' })
  id: number;

  @Column({ name: 'title', unique: true })
  title: string;

  /** 생성 메서드 */
  private static builder() {
    return Builder(Tag);
  }

  static create(object: Pick<Tag, 'title'> & Partial<Tag>) {
    return Tag.builder().id(object.id).title(object.title).build();
  }
}
