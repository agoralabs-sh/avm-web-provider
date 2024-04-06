// types
import type INetworkConfiguration from './INetworkConfiguration';

interface IDiscoverResult {
  host?: string;
  icon?: string;
  name: string;
  networks: INetworkConfiguration[];
  providerId: string;
}

export default IDiscoverResult;
