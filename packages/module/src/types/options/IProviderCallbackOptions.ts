// enums
import { ARC0027MethodEnum } from '@/enums';

// types
import type { TParams } from '@/types';

interface IProviderCallbackOptions<Params = TParams> {
  challenge: string;
  id: string;
  method: ARC0027MethodEnum;
  params: Params;
}

export default IProviderCallbackOptions;
