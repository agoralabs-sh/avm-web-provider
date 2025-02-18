// enums
import { ARC0027ErrorCodeEnum } from '@app/enums';

// types
import type { IBaseARC0027ErrorOptions } from '@app/types';

export default abstract class BaseARC0027Error {
  public readonly code: ARC0027ErrorCodeEnum;
  public message: string;
  public readonly name: string;
  public readonly providerId: string | undefined;

  public constructor({ message, providerId }: IBaseARC0027ErrorOptions) {
    this.message = message.toLowerCase();
    this.providerId = providerId;
  }
}
