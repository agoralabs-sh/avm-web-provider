/**
 * @property {string} genesisHash - the unique identifier for the network that is the hash of the genesis block.
 * @property {string} genesisId - a human-readable identifier for the network.
 * @property {string[]} sessionIds - [optional] a list of removed session IDs.
 */
interface IDisableResult {
  genesisHash: string;
  genesisId: string;
  sessionIds?: string[];
}

export default IDisableResult;
