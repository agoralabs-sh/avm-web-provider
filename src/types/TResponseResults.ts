// types
import type IDisableResult from './IDisableResult';
import type IDiscoverResult from './IDiscoverResult';
import type IEnableResult from './IEnableResult';
import type IPostTransactionsResult from './IPostTransactionsResult';

type TResponseResults =
  | IDisableResult
  | IDiscoverResult
  | IEnableResult
  | IPostTransactionsResult;

export default TResponseResults;
