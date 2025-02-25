// types
import type { INetworkConfiguration } from '@/types';

/**
 * @property {string} host - [optional] The domain name of the provider.
 * @property {string} icon - [optional] The URI pointing to an image.
 * @property {string} name - A human-readable canonical name of the provider.
 * @property {INetworkConfiguration[]} networks - A list of networks available for the provider.
 * @property {string} vcic - A base64 encoded provider public key credential that conforms to the VIP-03-0026
 * standard. This can be used to verify a provider's identity.
 */
interface IDiscoverResult {
  host?: string;
  icon?: string;
  name: string;
  networks: INetworkConfiguration[];
  vcic: string;
}

export default IDiscoverResult;
