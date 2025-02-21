// types
import type { ICredential, INetworkConfiguration } from '@/types';

/**
 * @property {ICredential} credential - The provider's credential that can be used to verify a provider's identity.
 * @property {string} host - [optional] The domain name of the provider.
 * @property {string} icon - [optional] The URI pointing to an image.
 * @property {string} name - A human-readable canonical name of the provider.
 * @property {INetworkConfiguration[]} networks - A list of networks available for the provider.
 */
interface IDiscoverResult {
  credential: ICredential;
  host?: string;
  icon?: string;
  name: string;
  networks: INetworkConfiguration[];
}

export default IDiscoverResult;
