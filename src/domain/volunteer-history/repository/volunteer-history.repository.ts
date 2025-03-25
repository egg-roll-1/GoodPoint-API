import { CustomRepository } from 'src/global/decorator/repository.decorator';
import { Repository } from 'typeorm';
import { VolunteerHistory } from '../entity/volunteer-history.entity';

@CustomRepository(VolunteerHistory)
export class VolunteerHistoryRepository extends Repository<VolunteerHistory> {}
