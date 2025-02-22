// enums
import { ARC0027ErrorCodeEnum } from '@/enums';

// errors
import BaseARC0027Error from './BaseARC0027Error';

// types
import type { IARC0027UnauthorizedProviderCredentialErrorOptions } from '@/types';

export default class ARC0027UnauthorizedProviderCredentialError extends BaseARC0027Error {
  public readonly code: ARC0027ErrorCodeEnum = ARC0027ErrorCodeEnum.UnauthorizedProviderCredentialError;
  public readonly name = 'UnauthorizedProviderCredentialError';
  public readonly id: string | undefined;

  constructor(options?: IARC0027UnauthorizedProviderCredentialErrorOptions) {
    super({
      message: options?.message || `provider${options?.id ? ` "${options.id}"` : ''} failed verification`,
    });

    this.id = options?.id;
  }
}
