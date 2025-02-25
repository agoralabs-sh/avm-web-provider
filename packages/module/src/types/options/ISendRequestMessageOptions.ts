// enums
import { VIP030027MethodEnum } from '@/enums';

// types
import type { TParams } from '@/types';

interface ISendRequestMessageOptions<Params = TParams | undefined> {
  challenge?: string;
  method: VIP030027MethodEnum;
  params: Params;
  timeout?: number;
  vcic: string;
}

export default ISendRequestMessageOptions;
