// types
import type ICredential from './ICredential';

/**
 * @property {string} privateKey - A base64 encoded private key that is used in signing.
 */
interface IPrivateKeyCredential extends ICredential {
  readonly privateKey: string;
}

export default IPrivateKeyCredential;
