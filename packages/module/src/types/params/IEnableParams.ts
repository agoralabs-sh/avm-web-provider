/**
 * @property {string} genesisHash - [optional] the unique identifier for the network that is the hash of the genesis
 * block.
 * @property {string} providerId - [optional] a unique identifier for the provider.
 */
interface IEnableParams {
  genesisHash?: string;
  providerId?: string;
}

export default IEnableParams;
