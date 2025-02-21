// types
import type { ICallbackOptions, TParams, TResults } from '@/types';
import type IProviderCallbackResult from './IProviderCallbackResult';

type TProviderCallback<Params = TParams, Result = TResults | void> = (
  options: ICallbackOptions<Params>
) => IProviderCallbackResult<Result> | Promise<IProviderCallbackResult<Result>>;

export default TProviderCallback;
