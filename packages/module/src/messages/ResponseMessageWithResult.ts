// messages
import BaseResponseMessage from './BaseResponseMessage';

// types
import type { IResponseMessageWithResult, TResponseResults } from '@app/types';

interface IOptions<Result = TResponseResults> {
  id: string;
  reference: string;
  requestId: string;
  result: Result;
}

export default class ResponseMessageWithResult<Result = TResponseResults>
  extends BaseResponseMessage
  implements IResponseMessageWithResult<Result>
{
  public readonly result: Result;

  constructor({ id, reference, requestId, result }: IOptions<Result>) {
    super({ id, reference, requestId });

    this.result = result;
  }
}
