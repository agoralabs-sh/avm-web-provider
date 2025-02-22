// types
import type { TParams } from '@/types';

/**
 * @property {string} challenge - [optional] An optional challenge that can be used to verify the returned response is
 * valid. If no challenge is provided, one will be created.
 * @property {string} credential - A base64 encoded provider public key credential that conforms to the VIP-03-0026
 * standard.
 */
interface IRequestOptions<Params = TParams> {
  challenge?: string;
  credential: string;
  params: Params;
}

export default IRequestOptions;
