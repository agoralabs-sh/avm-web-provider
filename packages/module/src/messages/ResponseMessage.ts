// types
import type { IResponseMessage } from '@/types';

export default class ResponseMessage implements IResponseMessage {
  public readonly id: string;
  public readonly reference: string;
  public readonly requestID: string;

  constructor({ id, reference, requestID }: IResponseMessage) {
    this.id = id;
    this.reference = reference;
    this.requestID = requestID;
  }
}
