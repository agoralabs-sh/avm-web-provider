// messages
import { RequestMessageWithCredential, RequestMessageWithoutCredential } from '@/messages';

// types
import type { TProviderCallback, TParams, TResults } from '@/types';

interface ISendResponseMessageOptions<Params = TParams, Result = TResults> {
  callback: TProviderCallback<Params, Result>;
  request: RequestMessageWithCredential<Params> | RequestMessageWithoutCredential<Params>;
}

export default ISendResponseMessageOptions;
