/**
 * @property {string} genesisHash - the unique identifier for the network that is the hash of the genesis block.
 * @property {string} genesisID - a human-readable identifier for the network.
 * @property {string[]} sessionIDs - [optional] a list of removed session IDs.
 */
interface IDisableResult {
  genesisHash: string;
  genesisID: string;
  sessionIDs?: string[];
}

export default IDisableResult;
