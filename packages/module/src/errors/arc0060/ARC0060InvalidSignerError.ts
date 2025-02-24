// enums
import { ARC0060ErrorTypeEnum } from '@/enums';

// errors
import BaseARC0060Error from './BaseARC0060Error';

// errors
import type { IBaseErrorOptions } from '@/types';

export default class ARC0060InvalidSignerError extends BaseARC0060Error {
  public readonly type: ARC0060ErrorTypeEnum = ARC0060ErrorTypeEnum.InvalidSignerError;
  public signer: string | undefined;

  constructor({ signer, ...baseOptions }: IBaseErrorOptions & Record<'signer', string | undefined>) {
    super(baseOptions);

    this.signer = signer;
  }
}
