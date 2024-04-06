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
  providerId: string;
}

export default class ARC0027MethodSupportedError extends BaseARC0027Error {
  public readonly code: ARC0027ErrorCodeEnum =
    ARC0027ErrorCodeEnum.MethodNotSupportedError;
  public readonly data: IData;
  public readonly name: string = 'MethodNotSupportedError';

  constructor({ message, method, providerId }: IOptions) {
    super({
      message:
        message ||
        `method "${method}" not supported for provider "${providerId}"`,
      providerId,
    });

    this.data = {
      method,
    };
  }
}
