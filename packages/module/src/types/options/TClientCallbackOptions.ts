// enums
import { VIP030027MethodEnum } from '@/enums';

// errors
import { BaseVIP030027Error } from '@/errors';

// types
import type { TResults } from '@/types';

interface IClientCallbackOptions {
  challenge: string;
  id: string;
  method: VIP030027MethodEnum;
  requestID: string;
  vcic: string;
}
type TClientCallbackOptions<Result = TResults> = IClientCallbackOptions &
  (
    | {
        error: BaseVIP030027Error;
        result: null;
        signature: null;
      }
    | {
        error: null;
        result: Result;
        signature: string;
      }
  );

export default TClientCallbackOptions;
