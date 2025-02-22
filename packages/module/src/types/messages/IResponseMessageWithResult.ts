// types
import type { TResults } from '@/types';
import type IResponseMessage from './IResponseMessage';

/**
 * @property {TResults} result - The result from the provider.
 * @property {string} signature - A base64 encoded signature of the request's challenge signed using the provider's
 * VIP-03-0026 compliant credential.
 */
interface IResponseMessageWithResult<Result = TResults> extends IResponseMessage {
  result: Result;
  signature: string;
}

export default IResponseMessageWithResult;
