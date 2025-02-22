/**
 * @property {string} signature - A base64 encoded signature of the data signed
 * by the private key of the intended signer.
 * @property {string} signer - The address used to authenticate.
 */
interface IAuthenticateResult {
  signature: string;
  signer: string;
}

export default IAuthenticateResult;
