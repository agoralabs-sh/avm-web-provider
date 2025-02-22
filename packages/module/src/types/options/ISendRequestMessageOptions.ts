// types
import type { TMethodsWithCredentialRequired, TMethodsWithoutCredentialRequired, TParams } from '@/types';

type ISendRequestMessageOptions<Params = TParams> =
  | {
      challenge?: string;
      credential: string;
      method: TMethodsWithCredentialRequired;
      params: Params;
      timeout?: number;
    }
  | {
      method: TMethodsWithoutCredentialRequired;
      params: Params;
      timeout?: number;
    };

export default ISendRequestMessageOptions;
