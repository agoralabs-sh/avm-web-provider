// messages
import ResponseMessageWithResult from './ResponseMessageWithResult';

// types
import type { IResponseMessageWithResultAndSignature, TResults } from '@/types';

export default class ResponseMessageWithResultAndSignature<Result = TResults>
  extends ResponseMessageWithResult<Result>
  implements IResponseMessageWithResultAndSignature<Result>
{
  public readonly signature: string;

  constructor({ signature, ...baseOptions }: IResponseMessageWithResultAndSignature<Result>) {
    super(baseOptions);

    this.signature = signature;
  }
}
