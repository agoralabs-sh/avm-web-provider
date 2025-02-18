// enums
import { ARC0060ScopeEnum } from '@app/enums';

/**
 * @property {Uint8Array} authenticationData - The authentication data used in
 * the signing process.
 * @property {Uint8Array} data - The data used in the signing process.
 * @property {Uint8Array} publicKey - The public key of the signer
 * @property {ARC0060ScopeEnum} scope - The purpose of the signature.
 * @property {Uint8Array} signature - The signature of the signed data.
 */
interface ISignTypedDataOptions {
  authenticationData: Uint8Array;
  data: Uint8Array;
  publicKey: Uint8Array;
  scope: ARC0060ScopeEnum;
  signature: Uint8Array;
}

export default ISignTypedDataOptions;
