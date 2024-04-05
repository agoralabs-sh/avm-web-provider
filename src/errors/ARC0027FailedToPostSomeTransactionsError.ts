// enums
import { ARC0027ErrorCodeEnum } from '@app/enums';

// errors
import BaseARC0027Error from './BaseARC0027Error';

interface IData {
  successTxnIDs: (string | null)[];
}

export default class ARC0027FailedToPostSomeTransactionsError extends BaseARC0027Error {
  public readonly code: ARC0027ErrorCodeEnum =
    ARC0027ErrorCodeEnum.FailedToPostSomeTransactionsError;
  public readonly data: IData;
  public readonly name: string = 'FailedToPostSomeTransactionsError';

  constructor(
    successTxnIDs: (string | null)[],
    providerId: string,
    message?: string
  ) {
    super(message || `failed to post some transactions`, providerId);

    this.data = {
      successTxnIDs,
    };
  }
}
