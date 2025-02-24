// enums
import { VIP030027ErrorCodeEnum } from '@/enums';

// types
import type { IBaseErrorOptions } from '@/types';

export default abstract class BaseVIP030027Error {
  public readonly code: VIP030027ErrorCodeEnum;
  public readonly isVIP030027Error = true;
  public message: string;
  public readonly name: string;

  public constructor({ message }: IBaseErrorOptions) {
    this.message = message.toLowerCase();
  }
}
