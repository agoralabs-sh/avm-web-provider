// enums
import { ARC0027ErrorCodeEnum } from '@app/enums';

// errors
import BaseARC0027Error from './BaseARC0027Error';

interface IData {
  genesisHashes: string[];
}

export default class ARC0027NetworkNotSupportedError extends BaseARC0027Error {
  public readonly code: ARC0027ErrorCodeEnum =
    ARC0027ErrorCodeEnum.NetworkNotSupportedError;
  public readonly data: IData;
  public readonly name: string = 'NetworkNotSupportedError';

  constructor(genesisHashes: string[], providerId: string, message?: string) {
    super(
      message ||
        `provider does not support network with genesis hashes [${genesisHashes
          .map((value) => `"${value}"`)
          .join(',')}]`,
      providerId
    );

    this.data = {
      genesisHashes,
    };
  }
}
