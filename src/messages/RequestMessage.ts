// types
import type { IRequestMessage, TRequestParams } from '@app/types';

interface IOptions<Params = TRequestParams> {
  id: string;
  params: Params | undefined;
  reference: string;
}

export default class RequestMessage<Params = TRequestParams>
  implements IRequestMessage<Params>
{
  public readonly id: string;
  public readonly params: Params | undefined;
  public readonly reference: string;

  constructor({ id, params, reference }: IOptions<Params>) {
    this.id = id;
    this.params = params;
    this.reference = reference;
  }
}
