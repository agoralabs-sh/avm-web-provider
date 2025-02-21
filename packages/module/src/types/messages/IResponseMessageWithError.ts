// errors
import { BaseARC0027Error } from '@/errors';

// types
import type IResponseMessage from './IResponseMessage';

interface IResponseMessageWithError extends IResponseMessage {
  error: BaseARC0027Error;
}

export default IResponseMessageWithError;
