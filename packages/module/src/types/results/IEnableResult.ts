// types
import type { IAccount } from '@/types';

/**
 * @property {IAccount[]} accounts - A list of accounts authorized accounts on the provider.
 * @property {string} genesisHash - The unique identifier for the network that is the hash of the genesis block.
 * @property {string} genesisID - A human-readable identifier for the network.
 * @property {string} sessionID - [optional] A unique identifier for the session as defined by the provider.
 */
interface IEnableResult {
  accounts: IAccount[];
  genesisHash: string;
  genesisID: string;
  sessionID?: string;
}

export default IEnableResult;
