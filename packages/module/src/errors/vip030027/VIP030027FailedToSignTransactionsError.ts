// enums
import { VIP030027ErrorCodeEnum } from '@/enums';

// errors
import BaseVIP030027Error from './BaseVIP030027Error';

// types
import type { IVIP030027FailedToSignTransactionsErrorOptions } from '@/types';

export default class VIP030027FailedToSignTransactionsError extends BaseVIP030027Error {
  public readonly code: VIP030027ErrorCodeEnum.FailedToSignTransactionsError =
    VIP030027ErrorCodeEnum.FailedToSignTransactionsError;
  public readonly failedTransactions: string[];
  public readonly name = 'VIP030027FailedToSignTransactionsError';
  public readonly vcic: string;

  constructor({ failedTransactions, message, vcic }: IVIP030027FailedToSignTransactionsErrorOptions) {
    super({
      message: message || `failed to sign transactions`,
    });

    this.failedTransactions = failedTransactions;
    this.vcic = vcic;
  }
}
