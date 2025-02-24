// enums
import { VIP030027ErrorCodeEnum } from '@/enums';

// errors
import BaseVIP030027Error from './BaseVIP030027Error';

// types
import type { IBaseErrorOptions } from '@/types';

export default class VIP030027InvalidGroupIdError extends BaseVIP030027Error {
  public readonly code: VIP030027ErrorCodeEnum.InvalidGroupIdError = VIP030027ErrorCodeEnum.InvalidGroupIdError;
  public readonly name = 'VIP030027InvalidGroupIdError';
  public readonly providerID: string;

  constructor({ message, providerID }: IBaseErrorOptions & Record<'providerID', string>) {
    super({
      message: message || `computed group id does not match the assigned id of one or more transactions`,
    });

    this.providerID = providerID;
  }
}
