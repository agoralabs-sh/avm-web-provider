// enums
import { VIP030027MethodEnum } from '@/enums';

// errors
import { BaseVIP030027Error } from '@/errors';

// types
import type { IDiscoverResult } from '@/types';

interface IClientDiscoverCallbackOptions {
  id: string;
  method: VIP030027MethodEnum.Discover;
  requestID: string;
}
type TClientDiscoverCallbackOptions = IClientDiscoverCallbackOptions &
  (
    | {
        error: BaseVIP030027Error;
        result: null;
      }
    | {
        error: null;
        result: IDiscoverResult;
      }
  );

export default TClientDiscoverCallbackOptions;
