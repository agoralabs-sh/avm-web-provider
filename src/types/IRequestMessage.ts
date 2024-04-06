// types
import type TRequestParams from './TRequestParams';

interface IRequestMessage<Params = TRequestParams> {
  id: string;
  params?: Params;
  reference: string;
}

export default IRequestMessage;
