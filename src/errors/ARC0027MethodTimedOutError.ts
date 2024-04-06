// enums
import { ARC0027ErrorCodeEnum, ARC0027MethodEnum } from '@app/enums';

// errors
import BaseARC0027Error from './BaseARC0027Error';

interface IData {
  method: ARC0027MethodEnum;
}
interface IOptions {
  method: ARC0027MethodEnum;
  message?: string;
  providerId?: string;
}

export default class ARC0027MethodTimedOutError extends BaseARC0027Error {
  public readonly code: ARC0027ErrorCodeEnum =
    ARC0027ErrorCodeEnum.MethodTimedOutError;
  public readonly data: IData;
  public readonly name: string = 'MethodTimedOutError';

  constructor({ message, method, providerId }: IOptions) {
    super({
      message: message || `method "${method}" timed out`,
      providerId,
    });

    this.data = {
      method,
    };
  }
}
