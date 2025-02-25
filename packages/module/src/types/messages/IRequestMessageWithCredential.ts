// enums
import { VIP030027MethodEnum } from '@/enums';

// types
import type { TParams } from '@/types';
import type IRequestMessage from './IRequestMessage';

/**
 * @property {string} challenge - A base 64 encoded challenge for the provider to sign to verify their identity.
 * @property {string} vcic - A base64 encoded provider public key credential that conforms to the VIP-03-0026
 * standard.
 * @property {VIP030027MethodEnum} method - All ARC-0027 methods except for the
 * `discover` method.
 */
interface IRequestMessageWithCredential<Params = TParams> extends IRequestMessage<Params> {
  challenge: string;
  method: VIP030027MethodEnum;
  vcic: string;
}

export default IRequestMessageWithCredential;
