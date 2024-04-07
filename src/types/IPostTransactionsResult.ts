/**
 * @property {string} providerId - a unique identifier for the provider.
 * @property {string[]} txnIDs - a list of 52-character base32 strings (without padding) corresponding the completed
 * transaction IDs.
 */
interface IPostTransactionsResult {
  providerId: string;
  txnIDs: string[];
}

export default IPostTransactionsResult;
