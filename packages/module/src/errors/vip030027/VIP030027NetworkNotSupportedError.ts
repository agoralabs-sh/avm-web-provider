// enums
import { VIP030027ErrorCodeEnum } from '@/enums';

// errors
import BaseVIP030027Error from './BaseVIP030027Error';

// types
import type { IVIP030027NetworkNotSupportedErrorOptions } from '@/types';

export default class VIP030027NetworkNotSupportedError extends BaseVIP030027Error {
  public readonly code: VIP030027ErrorCodeEnum.NetworkNotSupportedError =
    VIP030027ErrorCodeEnum.NetworkNotSupportedError;
  public readonly genesisHashes: string[];
  public readonly name: string = 'VIP030027NetworkNotSupportedError';
  public readonly vcic: string;

  public constructor({ genesisHashes, message, vcic }: IVIP030027NetworkNotSupportedErrorOptions) {
    super({
      message:
        message ||
        `provider does not support network with genesis hashes [${genesisHashes
          .map((value) => `"${value}"`)
          .join(',')}]`,
    });

    this.genesisHashes = genesisHashes;
    this.vcic = vcic;
  }
}
