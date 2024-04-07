/**
 * @property {string} providerId - a unique identifier for the provider.
 * @property {string[]} stxns - a list of base64 encoded signed transactions.
 */
interface IPostTransactionsParams {
  providerId: string;
  stxns: string[];
}

export default IPostTransactionsParams;
