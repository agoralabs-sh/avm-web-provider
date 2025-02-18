/**
 * @property {string} providerId - A unique identifier for the provider.
 * @property {string} signature - A base64 encoded signature of the data signed
 * by the private key of the intended signer.
 * @property {string} signer - The address used to authenticate.
 */
interface IAuthenticateResult {
  providerId: string;
  signature: string;
  signer: string;
}

export default IAuthenticateResult;
