/**
 * @property {string} providerId - a unique identifier for the provider.
 * @property {(string | null)[]} stxns - the list of base64 encoded signed transactions that is ready to be posted to
 * the network. If any of the transactions were not signed by the wallet, and no stxns were supplied, then null will be
 * in the place of the signed transaction.
 */
interface ISignTransactionsResult {
  providerId: string;
  stxns: (string | null)[];
}

export default ISignTransactionsResult;
