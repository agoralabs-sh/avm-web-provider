// types
import type { INetworkConfiguration } from '@/types';

/**
 * @property {string} credential - A base64 encoded provider public key credential that conforms to the VIP-03-0026
 * standard. This can be used to verify a provider's identity.
 * @property {string} host - [optional] The domain name of the provider.
 * @property {string} icon - [optional] The URI pointing to an image.
 * @property {string} name - A human-readable canonical name of the provider.
 * @property {INetworkConfiguration[]} networks - A list of networks available for the provider.
 */
interface IDiscoverResult {
  credential: string;
  host?: string;
  icon?: string;
  name: string;
  networks: INetworkConfiguration[];
}

export default IDiscoverResult;
