// types
import type INetworkConfiguration from './INetworkConfiguration';

/**
 * @property {string} host - [optional] the domain name of the provider.
 * @property {string} icon - [optional] the URI pointing to an image.
 * @property {string} name - a human-readable canonical name of the provider.
 * @property {INetworkConfiguration[]} networks - a list of networks available for the provider.
 * @property {string} providerId - a unique identifier for the provider.
 */
interface IDiscoverResult {
  host?: string;
  icon?: string;
  name: string;
  networks: INetworkConfiguration[];
  providerId: string;
}

export default IDiscoverResult;
