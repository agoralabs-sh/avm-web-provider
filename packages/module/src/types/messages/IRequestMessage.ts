// types
import type { TParams } from '@/types';

interface IRequestMessage<Params = TParams> {
  challenge: string;
  id: string;
  params: Params;
  reference: string;
}

export default IRequestMessage;
