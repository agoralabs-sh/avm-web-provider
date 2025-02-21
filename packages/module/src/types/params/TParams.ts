// types
import type IAuthenticateParams from './IAuthenticateParams';
import type IDisableParams from './IDisableParams';
import type IEnableParams from './IEnableParams';
import type IPostTransactionsParams from './IPostTransactionsParams';
import type ISignMessageParams from './ISignMessageParams';
import type ISignTransactionsParams from './ISignTransactionsParams';

type TParams =
  | IAuthenticateParams
  | IDisableParams
  | IEnableParams
  | IPostTransactionsParams
  | ISignMessageParams
  | ISignTransactionsParams
  | undefined;

export default TParams;
