// types
import type { ICredential, TResults } from '@/types';
import type IResponseMessage from './IResponseMessage';

/**
 * @property {string} challenge - A base 64 encoded challenge provided from the request.
 * @property {ICredential} credential - The provider's credentials used to sign the challenge.
 * @property {TResults} result - The result from the provider.
 * @property {string} signature - A base64 encoded signature of the request's challenge.
 */
interface IResponseMessageWithResult<Result = TResults> extends IResponseMessage {
  challenge: string;
  credential: ICredential;
  result: Result;
  signature: string;
}

export default IResponseMessageWithResult;
