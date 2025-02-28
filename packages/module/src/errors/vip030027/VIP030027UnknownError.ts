// enums
import { VIP030027ErrorCodeEnum } from '@/enums';

// errors
import BaseVIP030027Error from './BaseVIP030027Error';

export default class VIP030027UnknownError extends BaseVIP030027Error {
  public readonly code: VIP030027ErrorCodeEnum.UnknownError = VIP030027ErrorCodeEnum.UnknownError;
  public readonly name = 'VIP030027UnknownError';
}
