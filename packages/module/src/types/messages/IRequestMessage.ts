// types
import type { TRequestParams } from '@app/types';

interface IRequestMessage<Params = TRequestParams> {
  id: string;
  params?: Params;
  reference: string;
}

export default IRequestMessage;
