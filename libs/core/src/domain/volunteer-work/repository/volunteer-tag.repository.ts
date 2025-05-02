import { CustomRepository } from '@core/global/decorator/repository.decorator';
import { Repository } from 'typeorm';
import { VolunteerTag } from '../entity/volunteer-tag.entity';

@CustomRepository(VolunteerTag)
export class VolunteerTagRepository extends Repository<VolunteerTag> {}
