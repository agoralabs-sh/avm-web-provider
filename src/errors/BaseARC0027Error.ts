// enums
import { ARC0027ErrorCodeEnum } from '@app/enums';

interface IOptions {
  message: string;
  providerId?: string;
}

export default abstract class BaseARC0027Error {
  public readonly code: ARC0027ErrorCodeEnum;
  public message: string;
  public readonly name: string;
  public readonly providerId: string | undefined;

  public constructor({ message, providerId }: IOptions) {
    this.message = message.toLowerCase();
    this.providerId = providerId;
  }
}
