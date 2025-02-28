// messages
import ResponseMessage from './ResponseMessage';

// types
import type { IResponseMessageWithResult, TResults } from '@/types';

export default class ResponseMessageWithResult<Result = TResults>
  extends ResponseMessage
  implements IResponseMessageWithResult<Result>
{
  public readonly result: Result;

  constructor({ result, ...baseOptions }: IResponseMessageWithResult<Result>) {
    super(baseOptions);

    this.result = result;
  }
}
