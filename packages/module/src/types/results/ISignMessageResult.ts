/**
 * @property {string} signature - a base64 encoded signature of the message signed by the private key of the intended
 * signer.
 * @property {string} signer - the address used to sign the message.
 */
interface ISignMessageResult {
  signature: string;
  signer: string;
}

export default ISignMessageResult;
