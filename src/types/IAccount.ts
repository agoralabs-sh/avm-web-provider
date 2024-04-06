/**
 * @property {string} address - the address of the account.
 * @property {string} name - [optional] a human-readable name for this account.
 */
interface IAccount {
  address: string;
  name?: string;
}

export default IAccount;
