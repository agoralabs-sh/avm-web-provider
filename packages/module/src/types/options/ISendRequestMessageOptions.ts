// enums
import { ARC0027MethodEnum } from '@app/enums';

// types
import type { TRequestParams } from '@app/types';

interface ISendRequestMessageOptions<Params = TRequestParams> {
  method: ARC0027MethodEnum;
  params?: Params;
  timeout?: number;
}

export default ISendRequestMessageOptions;
