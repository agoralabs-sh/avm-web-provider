/**
 * @property {string} challenge - [optional] An optional challenge that can be used to verify the returned response is
 * valid. If no challenge is provided, one will be created.
 */
interface IRequestOptions {
  challenge?: string;
}

export default IRequestOptions;
