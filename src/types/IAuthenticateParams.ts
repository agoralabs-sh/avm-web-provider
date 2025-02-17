/**
 * @property {string} data - A base64 encoded string of some arbitrary data to
 * be used to authenticate.
 * @property {string} providerId - [optional] A unique identifier for the
 * provider.
 * @property {string} signer - [optional] The address to be used to
 * authenticate.
 */
interface IAuthenticateParams {
  data: string;
  providerId?: string;
  signer?: string;
}

export default IAuthenticateParams;
