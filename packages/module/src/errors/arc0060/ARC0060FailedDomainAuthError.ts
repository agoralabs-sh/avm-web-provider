// enums
import { ARC0060ErrorTypeEnum } from '@app/enums';

// errors
import BaseARC0060Error from './BaseARC0060Error';

export default class ARC0060FailedDomainAuthError extends BaseARC0060Error {
  public readonly type: ARC0060ErrorTypeEnum = ARC0060ErrorTypeEnum.FailedDomainAuthError;
}
