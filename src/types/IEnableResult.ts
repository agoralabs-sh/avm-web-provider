// types
import type IAccount from './IAccount';

/**
 * @property {IAccount[]} accounts - a list of accounts authorized accounts on the provider.
 * @property {string} genesisHash - the unique identifier for the network that is the hash of the genesis block.
 * @property {string} genesisId - a human-readable identifier for the network.
 * @property {string} providerId - a unique identifier for the provider.
 * @property {string} sessionId - [optional] a unique identifier for the session as defined by the provider.
 */
interface IEnableResult {
  accounts: IAccount[];
  genesisHash: string;
  genesisId: string;
  providerId: string;
  sessionId?: string;
}

export default IEnableResult;
