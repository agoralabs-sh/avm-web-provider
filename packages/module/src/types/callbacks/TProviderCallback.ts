// types
import type { IProviderCallbackWithCredentialOptions, TParams, TResults } from '@/types';
import type IProviderCallbackWithSignatureResult from './IProviderCallbackWithSignatureResult';

type TProviderCallback<Params = TParams, Result = TResults | void> = (
  options: IProviderCallbackWithCredentialOptions<Params>
) => IProviderCallbackWithSignatureResult<Result> | Promise<IProviderCallbackWithSignatureResult<Result>>;

export default TProviderCallback;
