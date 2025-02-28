// types
import type { TResults } from '@/types';
import type IResponseMessage from './IResponseMessage';

/**
 * @property {TResults} result - The result from the provider.
 */
interface IResponseMessageWithResult<Result = TResults> extends IResponseMessage {
  result: Result;
}

export default IResponseMessageWithResult;
