// messages
import RequestMessage from './RequestMessage';

// types
import type { IRequestMessageWithCredential, TMethodsWithCredentialRequired, TParams } from '@/types';

export default class RequestMessageWithCredential<Params = TParams>
  extends RequestMessage<Params>
  implements IRequestMessageWithCredential<Params>
{
  public readonly challenge: string;
  public readonly credential: string;
  public readonly method: TMethodsWithCredentialRequired;

  public constructor({ challenge, credential, method, ...baseOptions }: IRequestMessageWithCredential<Params>) {
    super(baseOptions);

    this.challenge = challenge;
    this.credential = credential;
    this.method = method;
  }
}
