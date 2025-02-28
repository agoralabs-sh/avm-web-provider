// enums
import { VIP030027ErrorCodeEnum } from '@/enums';

// errors
import BaseVIP030027Error from './BaseVIP030027Error';

// types
import type { IBaseErrorOptions } from '@/types';

export default class VIP030027InvalidInputError extends BaseVIP030027Error {
  public readonly code: VIP030027ErrorCodeEnum.InvalidInputError = VIP030027ErrorCodeEnum.InvalidInputError;
  public readonly name = 'VIP030027InvalidInputError';
  public readonly vcic: string;

  constructor({ message, vcic }: IBaseErrorOptions & Record<'vcic', string>) {
    super({
      message: message || `invalid input in transaction(s)`,
    });

    this.vcic = vcic;
  }
}
