// types
import type { TMethodsWithCredentialRequired, TMethodsWithoutCredentialRequired, TParams } from '@/types';

type IProviderCallbackOptions<Params = TParams> =
  | {
      challenge: string;
      credential: string;
      id: string;
      method: TMethodsWithCredentialRequired;
      params: Params;
    }
  | {
      id: string;
      method: TMethodsWithoutCredentialRequired;
      params: Params;
    };

export default IProviderCallbackOptions;
