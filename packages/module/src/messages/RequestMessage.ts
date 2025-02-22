// types
import type { IRequestMessage, TParams } from '@/types';

export default class RequestMessage<Params = TParams> implements IRequestMessage<Params> {
  public readonly id: string;
  public readonly params: Params;
  public readonly reference: string;

  constructor({ id, params, reference }: IRequestMessage<Params>) {
    this.id = id;
    this.params = params;
    this.reference = reference;
  }
}
