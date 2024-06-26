// enums
import { ARC0027ErrorCodeEnum } from '@app/enums';

// errors
import BaseARC0027Error from './BaseARC0027Error';

interface IOptions {
  message?: string;
  providerId?: string;
}

export default class ARC0027InvalidInputError extends BaseARC0027Error {
  public readonly code: ARC0027ErrorCodeEnum =
    ARC0027ErrorCodeEnum.InvalidInputError;
  public readonly name: string = 'InvalidInputError';

  constructor({ message, providerId }: IOptions) {
    super({
      message: message || `invalid input in transaction(s)`,
      providerId,
    });
  }
}
