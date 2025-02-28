/**
 * @property {string} genesisHash - [optional] The unique identifier for the network that is the hash of the genesis
 * block.
 * @property {string[]} sessionIDs - [optional] A list of specific session IDs to remove.
 */
interface IDisableParams {
  genesisHash?: string;
  sessionIDs?: string[];
}

export default IDisableParams;
