// types
import type { IProviderCallbackOptions, TParams, TResults } from '@/types';
import type IProviderCallbackResult from './IProviderCallbackResult';

type TProviderCallback<Params = TParams, Result = TResults | void> = (
  options: IProviderCallbackOptions<Params>
) => IProviderCallbackResult<Result> | Promise<IProviderCallbackResult<Result>>;

export default TProviderCallback;
