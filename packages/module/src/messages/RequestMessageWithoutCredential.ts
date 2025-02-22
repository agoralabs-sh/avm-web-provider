// messages
import RequestMessage from './RequestMessage';

// types
import type { IRequestMessageWithoutCredential, TMethodsWithoutCredentialRequired, TParams } from '@/types';

export default class RequestMessageWithoutCredential<Params = TParams>
  extends RequestMessage<Params>
  implements IRequestMessageWithoutCredential<Params>
{
  public readonly method: TMethodsWithoutCredentialRequired;

  public constructor({ method, ...baseOptions }: IRequestMessageWithoutCredential<Params>) {
    super(baseOptions);

    this.method = method;
  }
}
