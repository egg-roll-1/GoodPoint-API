import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import { EGBaseEntity } from 'src/global/entity/base.entity';

export class Page<T> {
  content: T[];

  @ApiProperty({ description: '전체 아이템 개수', example: 200 })
  totalElements: number;

  @ApiProperty({ description: '전체 페이지 개수', example: 10 })
  totalPages: number;

  @ApiProperty({ description: '현재 페이지 개수', example: 10 })
  number: number;

  @ApiProperty({ description: '현재 페이지 크기', example: 20 })
  size: number;

  @ApiProperty({ description: '현재 페이지 개수', example: 10 })
  numberOfElements: number;

  @ApiProperty({ description: '첫번째 페이지 여부' })
  isFirst: boolean;

  @ApiProperty({ description: '마지막 페이지 여부' })
  isLast: boolean;

  @ApiProperty({ description: '다음 페이지 존재 여부' })
  hasNext: boolean;

  @ApiProperty({ description: '이전 페이지 존재 여부' })
  hasPrevious: boolean;

  static builder<U>() {
    return Builder(Page<U>);
  }

  map<U>(mapper: (entity: T) => U): Page<U> {
    return Page.builder<U>()
      .content(this.content.map(mapper))
      .totalElements(this.totalElements)
      .totalPages(this.totalPages)
      .number(this.number)
      .size(this.size)
      .numberOfElements(this.numberOfElements)
      .isFirst(this.isFirst)
      .isLast(this.isLast)
      .hasNext(this.hasNext)
      .hasPrevious(this.hasPrevious)
      .build();
  }

  static create<T extends object>({
    content,
    total,
    size,
    page,
  }: {
    content: T[];
    total: number;
    size: number;
    page: number;
  }) {
    ++page;

    const numberOfElements = content.length;
    const totalPages = Math.ceil(total / size);
    const isFirst = page === 1;
    const isLast = page === totalPages;
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    const result = Page.builder<T>()
      .content(content)
      .totalElements(total)
      .totalPages(totalPages)
      .size(size)
      .number(page)
      .numberOfElements(numberOfElements)
      .isFirst(isFirst)
      .isLast(isLast)
      .hasNext(hasNext)
      .hasPrevious(hasPrevious)
      .build();

    return result;
  }

  static createPageDto<T extends EGBaseEntity>({
    content,
    total,
    size,
    page,
  }: {
    content: T[];
    total: number;
    size: number;
    page: number;
  }) {
    ++page;

    const numberOfElements = content.length;
    const totalPages = Math.ceil(total / size);
    const isFirst = page === 1;
    const isLast = page === totalPages;
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    const result = Page.builder<T>()
      .content(content)
      .totalElements(total)
      .totalPages(totalPages)
      .size(size)
      .number(page)
      .numberOfElements(numberOfElements)
      .isFirst(isFirst)
      .isLast(isLast)
      .hasNext(hasNext)
      .hasPrevious(hasPrevious)
      .build();

    return result;
  }

  setContent<U>(item: U[]): Page<U> {
    return Page.builder<U>()
      .content(item)
      .totalElements(this.totalElements)
      .totalPages(this.totalPages)
      .number(this.number)
      .size(this.size)
      .numberOfElements(this.numberOfElements)
      .isFirst(this.isFirst)
      .isLast(this.isLast)
      .hasNext(this.hasNext)
      .hasPrevious(this.hasPrevious)
      .build();
  }
}
