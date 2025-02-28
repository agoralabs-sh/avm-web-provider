// enums
import { VIP030027MethodEnum } from '@/enums';

// messages
import RequestMessage from './RequestMessage';

// types
import type { IRequestMessageWithCredential, TParams } from '@/types';

export default class RequestMessageWithCredential<Params = TParams>
  extends RequestMessage<Params>
  implements IRequestMessageWithCredential<Params>
{
  public readonly challenge: string;
  public readonly vcic: string;
  public readonly method: VIP030027MethodEnum;

  public constructor({ challenge, vcic, method, ...baseOptions }: IRequestMessageWithCredential<Params>) {
    super(baseOptions);

    this.challenge = challenge;
    this.vcic = vcic;
    this.method = method;
  }
}
