// errors
import { BaseVIP030027Error } from '@/errors';

// types
import type IResponseMessage from './IResponseMessage';

interface IResponseMessageWithError extends IResponseMessage {
  error: BaseVIP030027Error;
}

export default IResponseMessageWithError;
