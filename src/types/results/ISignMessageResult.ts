/**
 * @property {string} providerId - a unique identifier for the provider.
 * @property {string} signature - a base64 encoded signature of the message signed by the private key of the intended
 * signer.
 * @property {string} signer - the address used to sign the message.
 */
interface ISignMessageResult {
  providerId: string;
  signature: string;
  signer: string;
}

export default ISignMessageResult;
