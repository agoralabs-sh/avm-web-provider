// enums
import { VIP030027ErrorCodeEnum } from '@/enums';

// errors
import BaseVIP030027Error from './BaseVIP030027Error';

// types
import type { IVIP030027UnauthorizedProviderCredentialErrorOptions } from '@/types';

export default class VIP030027UnauthorizedProviderCredentialError extends BaseVIP030027Error {
  public readonly code: VIP030027ErrorCodeEnum = VIP030027ErrorCodeEnum.UnauthorizedProviderCredentialError;
  public readonly name = 'UnauthorizedProviderCredentialError';
  public readonly providerID: string | undefined;

  public constructor(options?: IVIP030027UnauthorizedProviderCredentialErrorOptions) {
    super({
      message: options?.message || `provider${options?.vcic ? ` "${options.vcic}"` : ''} failed verification`,
    });

    this.providerID = options?.vcic;
  }
}
