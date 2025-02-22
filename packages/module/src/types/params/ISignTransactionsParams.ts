// types
import type { IARC0001Transaction } from '@//types';

/**
 * @property {IARC0001Transaction[]} txns - a list of transactions to be signed
 * by providers.
 */
interface ISignTransactionsParams {
  txns: IARC0001Transaction[];
}

export default ISignTransactionsParams;
