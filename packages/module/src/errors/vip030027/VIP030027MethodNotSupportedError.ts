// enums
import { VIP030027ErrorCodeEnum, VIP030027MethodEnum } from '@/enums';

// errors
import BaseVIP030027Error from './BaseVIP030027Error';

// types
import type { IVIP030027MethodErrorOptions } from '@/types';

export default class VIP030027MethodSupportedError extends BaseVIP030027Error {
  public readonly code: VIP030027ErrorCodeEnum.MethodNotSupportedError = VIP030027ErrorCodeEnum.MethodNotSupportedError;
  public readonly method: VIP030027MethodEnum;
  public readonly name = 'VIP030027MethodSupportedError';
  public readonly vcic: string;

  constructor({ message, method, vcic }: IVIP030027MethodErrorOptions) {
    super({
      message: message || `method "${method}" not supported on provider "${vcic}"`,
    });

    this.method = method;
    this.vcic = vcic;
  }
}
