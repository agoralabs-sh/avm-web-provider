// enums
import { VIP030027MethodEnum } from '@/enums';

/**
 * @property {string} genesisHash - the unique identifier for the network that is the hash of the genesis block.
 * @property {string} genesisID - a human-readable identifier for the network.
 * @property {VIP030027MethodEnum[]} methods - a list of methods available from the provider for the chain.
 */
interface INetworkConfiguration {
  genesisHash: string;
  genesisID: string;
  methods: VIP030027MethodEnum[];
}

export default INetworkConfiguration;
