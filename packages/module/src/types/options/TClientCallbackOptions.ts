// enums
import { ARC0027MethodEnum } from '@/enums';

// errors
import { BaseARC0027Error } from '@/errors';

// types
import type { TResults } from '@/types';

type TClientCallbackOptions<Result = TResults> =
  | {
      error: BaseARC0027Error;
      id: string;
      method: ARC0027MethodEnum;
      requestID: string;
    }
  | {
      challenge: string;
      credential: string;
      id: string;
      method: ARC0027MethodEnum;
      result: Result;
      requestID: string;
    };

export default TClientCallbackOptions;
