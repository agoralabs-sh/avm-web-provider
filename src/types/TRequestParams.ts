// types
import type IDisableParams from './IDisableParams';
import type IDiscoverParams from './IDiscoverParams';
import type IEnableParams from './IEnableParams';
import type IPostTransactionsParams from './IPostTransactionsParams';

type TRequestParams =
  | IDisableParams
  | IDiscoverParams
  | IEnableParams
  | IPostTransactionsParams;

export default TRequestParams;
