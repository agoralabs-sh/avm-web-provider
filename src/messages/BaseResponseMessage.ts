// types
import type { IBaseResponseMessage } from '@app/types';

interface IOptions {
  id: string;
  reference: string;
  requestId: string;
}

export default class BaseResponseMessage implements IBaseResponseMessage {
  public readonly id: string;
  public readonly reference: string;
  public readonly requestId: string;

  constructor({ id, reference, requestId }: IOptions) {
    this.id = id;
    this.reference = reference;
    this.requestId = requestId;
  }
}
