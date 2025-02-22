// messages
import { RequestMessageWithCredential } from '@/messages';

// types
import type { TProviderCallback, TParams, TResults } from '@/types';

interface ISendResponseMessageOptions<Params = TParams, Result = TResults> {
  callback: TProviderCallback<Params, Result>;
  request: RequestMessageWithCredential<Params>;
}

export default ISendResponseMessageOptions;
