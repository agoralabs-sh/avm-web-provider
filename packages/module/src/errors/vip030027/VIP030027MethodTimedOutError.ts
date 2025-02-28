// enums
import { VIP030027ErrorCodeEnum, VIP030027MethodEnum } from '@/enums';

// errors
import BaseVIP030027Error from './BaseVIP030027Error';

// types
import type { IVIP030027MethodErrorOptions } from '@/types';

export default class VIP030027MethodTimedOutError extends BaseVIP030027Error {
  public readonly code: VIP030027ErrorCodeEnum.MethodTimedOutError = VIP030027ErrorCodeEnum.MethodTimedOutError;
  public readonly method: VIP030027MethodEnum;
  public readonly name = 'VIP030027MethodTimedOutError';
  public readonly vcic: string;

  constructor({ message, method, vcic }: IVIP030027MethodErrorOptions) {
    super({
      message: message || `method "${method}" to provider "${vcic}" timed out`,
    });

    this.method = method;
    this.vcic = vcic;
  }
}
