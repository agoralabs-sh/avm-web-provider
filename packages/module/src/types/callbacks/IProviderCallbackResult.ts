// types
import type { ICredential, TResults } from '@/types';

interface IProviderCallbackResult<Result = TResults> {
  credential: ICredential;
  result: Result;
}

export default IProviderCallbackResult;
