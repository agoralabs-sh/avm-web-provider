// types
import IECDSAAlgorithm from './IECDSAAlgorithm';
import IEd25519Algorithm from './IEd25519Algorithm';

/**
 * @property {IECDSAAlgorithm | IEd25519Algorithm} algorithm - An object that specifies the signature algorithm in use
 * and its parameters.
 * @property {string} name - [optional] A canonical name for the provider. This is not unique and should not be used to
 * identify the provider.
 * @property {string} publicKey - A base64 encoded public key from the provider that is used in the signing.
 */
interface ICredential {
  readonly algorithm: IECDSAAlgorithm | IEd25519Algorithm;
  readonly name?: string;
  readonly publicKey: string;
}

export default ICredential;
