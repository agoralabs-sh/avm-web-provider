// types
import type { TMethodsWithCredentialRequired, TParams } from '@/types';
import type IRequestMessage from './IRequestMessage';

/**
 * @property {string} challenge - A base 64 encoded challenge for the provider to sign to verify their identity.
 * @property {string} credential - A base64 encoded provider public key credential that conforms to the VIP-03-0026
 * standard.
 * @property {TMethodsWithCredentialRequired} method - All ARC-0027 methods except for the
 * `discover` method.
 */
interface IRequestMessageWithCredential<Params = TParams> extends IRequestMessage<Params> {
  challenge: string;
  credential: string;
  method: TMethodsWithCredentialRequired;
}

export default IRequestMessageWithCredential;
