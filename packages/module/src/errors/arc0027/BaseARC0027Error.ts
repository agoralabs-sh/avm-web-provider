// enums
import { ARC0027ErrorCodeEnum } from '@/enums';

// types
import type { IBaseErrorOptions } from '@/types';

export default abstract class BaseARC0027Error {
  public readonly code: ARC0027ErrorCodeEnum;
  public message: string;
  public readonly name: string;

  public constructor({ message }: IBaseErrorOptions) {
    this.message = message.toLowerCase();
  }
}
