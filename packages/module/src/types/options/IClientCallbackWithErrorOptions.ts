// errors
import { BaseARC0027Error } from '@/errors';

// types
import type IClientCallbackOptions from './IClientCallbackOptions';

interface IClientCallbackWithErrorOptions extends IClientCallbackOptions {
  error: BaseARC0027Error;
}

export default IClientCallbackWithErrorOptions;
