// types
import type { TResults } from '@/types';
import type IProviderCallbackResult from './IProviderCallbackResult';

interface IProviderCallbackWithSignatureResult<Result = TResults> extends IProviderCallbackResult<Result> {
  credential: string;
  signature: string;
}

export default IProviderCallbackWithSignatureResult;
