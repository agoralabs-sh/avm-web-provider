// enums
import { ARC0027MethodEnum } from '@/enums';

// types
import type { TParams } from '@/types';

interface ISendRequestMessageOptions<Params = TParams> {
  challenge?: string;
  credential: string;
  method: ARC0027MethodEnum;
  params: Params;
  timeout?: number;
}

export default ISendRequestMessageOptions;
