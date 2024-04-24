/**
 * @property {string} message - a human-readable UTF-8 string to sign.
 * @property {string} providerId - [optional] a unique identifier for the provider.
 * @property {string} signer - the address to be used to sign the message.
 */
interface ISignMessageParams {
  message: string;
  providerId?: string;
  signer: string;
}

export default ISignMessageParams;
