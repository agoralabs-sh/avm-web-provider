// errors
import { BaseARC0027Error } from '@/errors';

// messages
import ResponseMessage from './ResponseMessage';

// types
import type { IResponseMessageWithError } from '@/types';

export default class ResponseMessageWithError extends ResponseMessage implements IResponseMessageWithError {
  public readonly error: BaseARC0027Error;

  constructor({ error, ...baseOptions }: IResponseMessageWithError) {
    super(baseOptions);

    this.error = error;
  }
}
