// types
import type { TResults } from '@/types';
import type IResponseMessageWithResult from './IResponseMessageWithResult';

/**
 * @property {string} signature - A base64 encoded signature of the request's challenge signed using the provider's
 * VIP-03-0026 compliant credential.
 */
interface IResponseMessageWithResultAndSignature<Result = TResults> extends IResponseMessageWithResult<Result> {
  signature: string;
}

export default IResponseMessageWithResultAndSignature;
