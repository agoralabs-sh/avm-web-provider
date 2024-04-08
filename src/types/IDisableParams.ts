/**
 * @property {string} genesisHash - [optional] the unique identifier for the network that is the hash of the genesis
 * block.
 * @property {string} providerId - [optional] a unique identifier for the provider.
 * @property {string[]} sessionIds - [optional] a list of specific session IDs to remove.
 */
interface IDisableParams {
  genesisHash?: string;
  providerId?: string;
  sessionIds?: string[];
}

export default IDisableParams;
