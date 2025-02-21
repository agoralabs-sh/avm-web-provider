// types
import type { IRequestMessage, TParams } from '@/types';

export default class RequestMessage<Params = TParams> implements IRequestMessage<Params> {
  public readonly challenge: string;
  public readonly id: string;
  public readonly params: Params;
  public readonly reference: string;

  constructor({ challenge, id, params, reference }: IRequestMessage<Params>) {
    this.challenge = challenge;
    this.id = id;
    this.params = params;
    this.reference = reference;
  }
}
