// enums
import { VIP030027ErrorCodeEnum } from '@/enums';

// errors
import BaseVIP030027Error from './BaseVIP030027Error';

// types
import type { IVIP030027FailedToPostSomeTransactionsErrorOptions } from '@/types';

export default class VIP030027FailedToPostSomeTransactionsError extends BaseVIP030027Error {
  public readonly code: VIP030027ErrorCodeEnum.FailedToPostSomeTransactionsError =
    VIP030027ErrorCodeEnum.FailedToPostSomeTransactionsError;
  public readonly name = 'VIP030027FailedToPostSomeTransactionsError';
  public readonly successTxnIDs: string[];
  public readonly vcic: string;

  constructor({ successTxnIDs, message, vcic }: IVIP030027FailedToPostSomeTransactionsErrorOptions) {
    super({
      message: message || `failed to post some transactions to the network`,
    });

    this.successTxnIDs = successTxnIDs;
    this.vcic = vcic;
  }
}
