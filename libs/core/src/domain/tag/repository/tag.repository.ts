import { CustomRepository } from '@core/global/decorator/repository.decorator';
import { Repository } from 'typeorm';
import { Tag } from '../entity/tag.entity';

@CustomRepository(Tag)
export class TagRepository extends Repository<Tag> {}
