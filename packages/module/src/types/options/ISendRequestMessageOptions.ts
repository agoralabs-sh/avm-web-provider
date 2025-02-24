// enums
import { VIP030027MethodEnum } from '@/enums';

// types
import type { TParams } from '@/types';

interface ISendRequestMessageOptions<Params = TParams | undefined> {
  challenge?: string;
  credential: string;
  method: VIP030027MethodEnum;
  params: Params;
  timeout?: number;
}

export default ISendRequestMessageOptions;
