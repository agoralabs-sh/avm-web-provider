// enums
import { ARC0027MethodEnum } from '@app/enums';

// types
import type TRequestParams from './TRequestParams';

interface SendRequestWithTimeoutOptions<Params = TRequestParams> {
  method: ARC0027MethodEnum;
  params?: Params;
  timeout?: number;
}

export default SendRequestWithTimeoutOptions;
