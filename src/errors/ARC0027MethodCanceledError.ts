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

export default class ARC0027MethodCanceledError extends BaseARC0027Error {
  public readonly code: ARC0027ErrorCodeEnum =
    ARC0027ErrorCodeEnum.MethodCanceledError;
  public readonly data: IData;
  public readonly name: string = 'MethodCanceledError';

  constructor({ message, method, providerId }: IOptions) {
    super({
      message:
        message || `method "${method}" canceled for provider "${providerId}"`,
      providerId,
    });

    this.data = {
      method,
    };
  }
}
