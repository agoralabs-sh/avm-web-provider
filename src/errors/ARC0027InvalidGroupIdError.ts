// enums
import { ARC0027ErrorCodeEnum } from '@app/enums';

// errors
import BaseARC0027Error from './BaseARC0027Error';

interface IOptions {
  message?: string;
  providerId?: string;
}

export default class ARC0027InvalidGroupIdError extends BaseARC0027Error {
  public readonly code: ARC0027ErrorCodeEnum =
    ARC0027ErrorCodeEnum.InvalidGroupIdError;
  public readonly name: string = 'InvalidGroupIdError';

  constructor({ message, providerId }: IOptions) {
    super({
      message:
        message ||
        `computed group id does not match the assigned id of one or more transactions`,
      providerId,
    });
  }
}
