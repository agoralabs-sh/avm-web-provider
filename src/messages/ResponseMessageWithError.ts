// errors
import { BaseARC0027Error } from '@app/errors';

// messages
import BaseResponseMessage from './BaseResponseMessage';

// types
import type { IResponseMessageWithError } from '@app/types';

interface IOptions {
  error: BaseARC0027Error;
  id: string;
  reference: string;
  requestId: string;
}

export default class ResponseMessageWithError
  extends BaseResponseMessage
  implements IResponseMessageWithError
{
  public readonly error: BaseARC0027Error;

  constructor({ error, id, reference, requestId }: IOptions) {
    super({ id, reference, requestId });

    this.error = error;
  }
}
