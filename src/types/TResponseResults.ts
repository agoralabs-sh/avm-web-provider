// types
import type IDiscoverResult from './IDiscoverResult';
import type IEnableResult from './IEnableResult';
import type IPostTransactionsResult from './IPostTransactionsResult';

type TResponseResults =
  | IDiscoverResult
  | IEnableResult
  | IPostTransactionsResult;

export default TResponseResults;
