// enums
import { ARC0060ScopeEnum } from '@app/enums';

/**
 * @property {Uint8Array} authenticationData - The authentication data.
 * @property {Uint8Array} data - The data to be signed.
 * @property {string} domain - This is the domain requesting the signature. It
 * can be a URL, a DID, or any other identifier.
 * @property {Uint8Array} privateKey - The private key that will be used to
 * sign.
 * @property {ARC0060ScopeEnum} scope - The purpose of the signature.
 */
interface ISignTypedDataOptions {
  authenticationData: Uint8Array;
  data: Uint8Array;
  domain: string;
  privateKey: Uint8Array;
  scope: ARC0060ScopeEnum;
}

export default ISignTypedDataOptions;
