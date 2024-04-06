// enums
import { ARC0027ErrorCodeEnum } from '@app/enums';

// errors
import BaseARC0027Error from './BaseARC0027Error';

interface IData {
  signer?: string;
}
interface IOptions {
  message?: string;
  providerId: string;
  signer?: string;
}

export default class ARC0027UnauthorizedSignerError extends BaseARC0027Error {
  public readonly code: ARC0027ErrorCodeEnum =
    ARC0027ErrorCodeEnum.UnauthorizedSignerError;
  public readonly data: IData;
  public readonly name: string = 'UnauthorizedSignerError';

  constructor({ message, providerId, signer }: IOptions) {
    super({
      message: message || `unauthorized signer${signer ? ` "${signer}"` : ''}`,
      providerId,
    });

    this.data = {
      signer,
    };
  }
}
