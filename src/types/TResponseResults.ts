// types
import type IDisableResult from './IDisableResult';
import type IDiscoverResult from './IDiscoverResult';
import type IEnableResult from './IEnableResult';
import type IPostTransactionsResult from './IPostTransactionsResult';
import type ISignMessageResult from './ISignMessageResult';
import type ISignTransactionsResult from './ISignTransactionsResult';

type TResponseResults =
  | IDisableResult
  | IDiscoverResult
  | IEnableResult
  | IPostTransactionsResult
  | ISignMessageResult
  | ISignTransactionsResult;

export default TResponseResults;
