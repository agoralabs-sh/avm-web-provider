// types
import type { TResults } from '@/types';
import type IClientCallbackOptions from './IClientCallbackOptions';

interface IClientCallbackWithResultOptions<Result = TResults> extends IClientCallbackOptions {
  result: Result;
}

export default IClientCallbackWithResultOptions;
