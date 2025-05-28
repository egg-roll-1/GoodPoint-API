import { CreditHistory } from '@core/domain/credit-history/entity/credit-history.entity';
import { CreditException } from '@core/domain/credit-history/exception/credit-history.exception';
import { User } from '@core/domain/user/entity/user.entity';
import { UserException } from '@core/domain/user/exception/user.exception';
import { EGException } from '@core/global/exception/exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class CreditHistoryService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(CreditHistory)
    private readonly creditHistoryRepository: Repository<CreditHistory>,
  ) {}

  @Transactional()
  async createUsage({
    userId,
    orderId,
    amount,
  }: {
    userId: number;
    orderId: number;
    amount: number;
  }) {
    amount = -Math.abs(amount);

    const user = await this.userRepository
      .findOneOrFail({
        relations: {
          creditHistory: true,
        },
        where: { id: userId },
      })
      .catch(() => {
        throw new EGException(UserException.NOT_FOUND);
      });

    await this.checkUserCreditOrThrow(user, amount);

    return this.creditHistoryRepository.save(
      CreditHistory.create({
        userId,
        orderId,
        amount,
      }),
    );
  }

  private async checkUserCreditOrThrow(user: User, requiredAmount: number) {
    const creditBalance = user.creditHistory.reduce(
      (sum, h) => sum + h.amount,
      0,
    );

    if (creditBalance < requiredAmount) {
      throw new EGException(CreditException.NOT_ENOUGH_CREDIT);
    }
  }
}
