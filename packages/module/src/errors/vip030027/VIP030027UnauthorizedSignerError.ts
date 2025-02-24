// enums
import { VIP030027ErrorCodeEnum } from '@/enums';

// errors
import BaseVIP030027Error from './BaseVIP030027Error';

// types
import type { IVIP030027UnauthorizedSignerErrorOptions } from '@/types';

export default class VIP030027UnauthorizedSignerError extends BaseVIP030027Error {
  public readonly code: VIP030027ErrorCodeEnum.UnauthorizedSignerError = VIP030027ErrorCodeEnum.UnauthorizedSignerError;
  public readonly name = 'VIP030027UnauthorizedSignerError';
  public readonly providerID: string;
  public readonly signer: string | undefined;

  public constructor({ message, providerID, signer }: IVIP030027UnauthorizedSignerErrorOptions) {
    super({
      message: message || `unauthorized signer${signer ? ` "${signer}"` : ''}`,
    });

    this.providerID = providerID;
    this.signer = signer;
  }
}
