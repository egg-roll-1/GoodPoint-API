import { CustomRepository } from '@core/global/decorator/repository.decorator';
import { Repository } from 'typeorm';
import { VolunteerWork } from '../entity/volunteer-work.entity';

@CustomRepository(VolunteerWork)
export class VolunteerWorkRepository extends Repository<VolunteerWork> {}
