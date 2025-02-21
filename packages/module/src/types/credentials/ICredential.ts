// types
import IECDSAAlgorithm from './IECDSAAlgorithm';
import IEd25519Algorithm from './IEd25519Algorithm';

/**
 * @property {IECDSAAlgorithm | IEd25519Algorithm} algorithm - An object that specifies the signature algorithm in use
 * and its parameters.
 * @property {string} name - [optional] A canonical name for the provider. This is not unique and should not be used to
 * identify the provider.
 * @property {string} publicKey - A base64 encoded public key from the provider that is used in the signing.
 * @property {string} signature - A base64 encoded signature of the request's challenge.
 */
interface ICredential {
  algorithm: IECDSAAlgorithm | IEd25519Algorithm;
  name?: string;
  publicKey: string;
  signature: string;
}

export default ICredential;
