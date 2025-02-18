// enums
import { ARC0060ErrorTypeEnum } from '@app/enums';

// types
import type { IBaseErrorOptions } from '@app/types';

export default abstract class BaseARC0060Error {
  public readonly type: ARC0060ErrorTypeEnum;
  public readonly isARC0060Error: boolean = true;
  public message: string;

  public constructor({ message }: IBaseErrorOptions) {
    this.message = message.toLowerCase();
  }
}
