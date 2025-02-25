// messages
import { RequestMessageWithCredential } from '@/messages';

// types
import type { TParams, TResults, IProviderCallbackResultWithSignature } from '@/types';
import type IProviderCallbackOptionsWithCredential from './IProviderCallbackOptionsWithCredential';

interface ISendResponseMessageOptions<Params = TParams, Result = TResults> {
  callback: (
    options: IProviderCallbackOptionsWithCredential<Params>
  ) => IProviderCallbackResultWithSignature<Result> | Promise<IProviderCallbackResultWithSignature<Result>>;
  request: RequestMessageWithCredential<Params>;
}

export default ISendResponseMessageOptions;
