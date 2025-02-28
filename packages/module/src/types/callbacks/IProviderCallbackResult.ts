// types
import type { TResults } from '@/types';

interface IProviderCallbackResult<Result = TResults> {
  result: Result;
}

export default IProviderCallbackResult;
