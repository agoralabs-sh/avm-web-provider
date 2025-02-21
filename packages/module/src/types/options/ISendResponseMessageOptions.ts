// enums
import { ARC0027MethodEnum } from '@/enums';

// messages
import { RequestMessage } from '@/messages';

// types
import type { TProviderCallback, TParams, TResults } from '@/types';

interface ISendResponseMessageOptions<Params = TParams, Result = TResults> {
  callback: TProviderCallback<Params, Result>;
  method: ARC0027MethodEnum;
  request: RequestMessage<Params>;
}

export default ISendResponseMessageOptions;
