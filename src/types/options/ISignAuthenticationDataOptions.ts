// enums
import { ARC0060ScopeEnum } from '@app/enums';

/**
 * @property {Uint8Array} authenticationData - A base64 encoded string of data to be signed.
 * @property {string} data - The data to be signed.
 * @property {string} domain - This is the domain requesting the signature. It
 * can be a URL, a DID, or any other identifier.
 * @property {Uint8Array} privateKey - The private key that will be used to
 * sign.
 * @property {ARC0060ScopeEnum} scope - The purpose of the signature.
 */
interface ISignAuthenticationDataOptions {
  authenticationData: Uint8Array;
  data: Uint8Array;
  domain: string;
  privateKey: Uint8Array;
  scope: ARC0060ScopeEnum;
}

export default ISignAuthenticationDataOptions;
