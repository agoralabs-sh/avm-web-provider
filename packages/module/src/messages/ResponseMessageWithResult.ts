// messages
import ResponseMessage from './ResponseMessage';

// types
import type { ICredential, IResponseMessageWithResult, TResults } from '@/types';

export default class ResponseMessageWithResult<Result = TResults>
  extends ResponseMessage
  implements IResponseMessageWithResult<Result>
{
  public readonly challenge: string;
  public readonly credential: ICredential;
  public readonly result: Result;

  constructor({ challenge, credential, result, ...baseOptions }: IResponseMessageWithResult<Result>) {
    super(baseOptions);

    this.challenge = challenge;
    this.credential = credential;
    this.result = result;
  }
}
