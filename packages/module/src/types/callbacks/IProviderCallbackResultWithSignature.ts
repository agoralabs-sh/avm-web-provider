// types
import type { TResults } from '@/types';
import type IProviderCallbackResult from './IProviderCallbackResult';

interface IProviderCallbackResultWithSignature<Result = TResults> extends IProviderCallbackResult<Result> {
  signature: string;
  vcic: string;
}

export default IProviderCallbackResultWithSignature;
