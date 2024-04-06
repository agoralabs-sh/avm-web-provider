// enums
import { ARC0027MethodEnum } from '@app/enums';

/**
 * @property {string} genesisHash - the unique identifier for the network that is the hash of the genesis block.
 * @property {string} genesisId - a human-readable identifier for the network.
 * @property {ARC0027MethodEnum[]} methods - a list of methods available from the provider for the chain.
 */
interface INetworkConfiguration {
  genesisHash: string;
  genesisId: string;
  methods: ARC0027MethodEnum[];
}

export default INetworkConfiguration;
