// enums
import { ARC0027MethodEnum } from '@app/enums';

// types
import type TRequestParams from './TRequestParams';

interface IAVMWebProviderCallbackOptions<Params = TRequestParams> {
  id: string;
  method: ARC0027MethodEnum;
  params?: Params;
}

export default IAVMWebProviderCallbackOptions;
