// enums
import { VIP030027MethodEnum } from '@/enums';

// types
import type { TParams } from '@/types';

interface IProviderCallbackOptions<Params = TParams> {
  id: string;
  params: Params;
  method: VIP030027MethodEnum;
}

export default IProviderCallbackOptions;
