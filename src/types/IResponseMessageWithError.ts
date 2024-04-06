// errors
import { BaseARC0027Error } from '@app/errors';

// types
import type IBaseResponseMessage from './IBaseResponseMessage';

interface IResponseMessageWithError extends IBaseResponseMessage {
  error: BaseARC0027Error;
}

export default IResponseMessageWithError;
