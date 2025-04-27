import { CustomRepository } from '@core/global/decorator/repository.decorator';
import { Repository } from 'typeorm';
import { CreditHistory } from '../entity/credit-history.entity';

@CustomRepository(CreditHistory)
export class CreditHistoryRepository extends Repository<CreditHistory> {}
