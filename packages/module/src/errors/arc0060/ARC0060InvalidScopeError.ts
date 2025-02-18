// enums
import { ARC0060ErrorTypeEnum } from '@app/enums';

// errors
import BaseARC0060Error from './BaseARC0060Error';

// errors
import type { IBaseErrorOptions } from '@app/types';

export default class ARC0060InvalidScopeError extends BaseARC0060Error {
  public readonly type: ARC0060ErrorTypeEnum = ARC0060ErrorTypeEnum.InvalidScopeError;
  public scope: number | undefined;

  constructor({ scope, ...baseOptions }: IBaseErrorOptions & Record<'scope', number | undefined>) {
    super(baseOptions);

    this.scope = scope;
  }
}
