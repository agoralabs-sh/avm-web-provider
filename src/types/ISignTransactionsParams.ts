// types
import type IARC0001Transaction from './IARC0001Transaction';

/**
 * @property {string} providerId - [optional] a unique identifier for the provider.
 * @property {IARC0001Transaction[]} txns - a list of transactions to be signed by providers.
 */
interface ISignTransactionsParams {
  providerId?: string;
  txns: IARC0001Transaction[];
}

export default ISignTransactionsParams;
