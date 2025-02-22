// enums
import { ARC0027MethodEnum } from '@/enums';

// messages
import RequestMessage from './RequestMessage';

// types
import type { IDiscoverRequestMessage } from '@/types';

export default class DiscoverRequestMessage extends RequestMessage<undefined> implements IDiscoverRequestMessage {
  public readonly method: ARC0027MethodEnum.Discover;

  public constructor({ method, ...baseOptions }: IDiscoverRequestMessage) {
    super(baseOptions);

    this.method = method;
  }
}
