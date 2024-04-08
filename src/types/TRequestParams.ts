// types
import type IDisableParams from './IDisableParams';
import type IDiscoverParams from './IDiscoverParams';
import type IEnableParams from './IEnableParams';
import type IPostTransactionsParams from './IPostTransactionsParams';
import type ISignTransactionsParams from './ISignTransactionsParams';

type TRequestParams =
  | IDisableParams
  | IDiscoverParams
  | IEnableParams
  | IPostTransactionsParams
  | ISignTransactionsParams;

export default TRequestParams;
