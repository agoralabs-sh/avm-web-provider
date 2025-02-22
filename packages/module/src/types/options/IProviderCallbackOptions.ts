// enums
import { ARC0027MethodEnum } from '@/enums';

// types
import type { TParams } from '@/types';

interface IProviderCallbackOptions<Params = TParams> {
  id: string;
  params: Params;
  method: ARC0027MethodEnum;
}

export default IProviderCallbackOptions;
