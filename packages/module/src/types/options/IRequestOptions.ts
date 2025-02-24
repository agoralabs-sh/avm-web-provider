/**
 * @property {string} challenge - [optional] An optional challenge that can be used to verify the returned response is
 * valid. If no challenge is provided, one will be created.
 * @property {string} credential - A base64 encoded provider public key credential that conforms to the VIP-03-0026
 * standard.
 */
interface IRequestOptions {
  challenge?: string;
  credential: string;
}

export default IRequestOptions;
