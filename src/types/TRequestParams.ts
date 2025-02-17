// types
import type IAuthenticateParams from './IAuthenticateParams';
import type IDisableParams from './IDisableParams';
import type IDiscoverParams from './IDiscoverParams';
import type IEnableParams from './IEnableParams';
import type IPostTransactionsParams from './IPostTransactionsParams';
import type ISignMessageParams from './ISignMessageParams';
import type ISignTransactionsParams from './ISignTransactionsParams';

type TRequestParams =
  | IAuthenticateParams
  | IDisableParams
  | IDiscoverParams
  | IEnableParams
  | IPostTransactionsParams
  | ISignMessageParams
  | ISignTransactionsParams;

export default TRequestParams;
