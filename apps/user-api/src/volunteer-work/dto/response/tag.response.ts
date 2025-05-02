import { Tag } from '@core/domain/tag/entity/tag.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

export class TagResponse {
  @ApiProperty({ description: '태그 ID' })
  id: number;

  @ApiProperty({ description: '태그명' })
  title: string;

  static from(tag: Tag) {
    return Builder(TagResponse).id(tag.id).title(tag.title).build();
  }

  static fromArray(tagList: Tag[]) {
    const result: TagResponse[] = [];
    for (const tag of tagList) {
      result.push(TagResponse.from(tag));
    }
    return result;
  }
}
