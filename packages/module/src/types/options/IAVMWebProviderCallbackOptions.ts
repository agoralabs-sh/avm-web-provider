// enums
import { ARC0027MethodEnum } from '@app/enums';

// types
import type { TRequestParams } from '@app/types';

interface IAVMWebProviderCallbackOptions<Params = TRequestParams> {
  id: string;
  method: ARC0027MethodEnum;
  params?: Params;
}

export default IAVMWebProviderCallbackOptions;
