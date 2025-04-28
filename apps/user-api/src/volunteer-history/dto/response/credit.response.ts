import { CreditHistory } from '@core/domain/credit-history/entity/credit-history.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

export class CreditHistoryResponse {
  @ApiProperty({ description: '크레딧 내역 ID' })
  id: number;

  @ApiProperty({ description: '크레딧 금액' })
  amount: number;

  @ApiProperty({ description: '만료일' })
  expiredAt: Date;

  static from(creditHistory: CreditHistory) {
    return Builder(CreditHistoryResponse)
      .id(creditHistory.id)
      .amount(creditHistory.amount)
      .expiredAt(creditHistory.expiredAt)
      .build();
  }
}
