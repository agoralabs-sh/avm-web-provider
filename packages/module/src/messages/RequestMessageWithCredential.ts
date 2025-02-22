// enums
import { ARC0027MethodEnum } from '@/enums';

// messages
import RequestMessage from './RequestMessage';

// types
import type { IRequestMessageWithCredential, TParams } from '@/types';

export default class RequestMessageWithCredential<Params = TParams>
  extends RequestMessage<Params>
  implements IRequestMessageWithCredential<Params>
{
  public readonly challenge: string;
  public readonly credential: string;
  public readonly method: ARC0027MethodEnum;

  public constructor({ challenge, credential, method, ...baseOptions }: IRequestMessageWithCredential<Params>) {
    super(baseOptions);

    this.challenge = challenge;
    this.credential = credential;
    this.method = method;
  }
}
