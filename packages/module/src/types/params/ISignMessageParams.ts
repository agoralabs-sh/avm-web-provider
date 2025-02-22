/**
 * @property {string} message - a human-readable UTF-8 string to sign.
 * @property {string} signer - [optional] the address to be used to sign the message.
 */
interface ISignMessageParams {
  message: string;
  signer?: string;
}

export default ISignMessageParams;
