// types
import type IDisableResult from './IDisableResult';
import type IDiscoverResult from './IDiscoverResult';
import type IEnableResult from './IEnableResult';
import type IPostTransactionsResult from './IPostTransactionsResult';
import type ISignTransactionsResult from './ISignTransactionsResult';

type TResponseResults =
  | IDisableResult
  | IDiscoverResult
  | IEnableResult
  | IPostTransactionsResult
  | ISignTransactionsResult;

export default TResponseResults;
