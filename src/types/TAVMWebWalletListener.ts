// types
import type TRequestParams from './TRequestParams';
import type TResponseResults from './TResponseResults';

type TAVMWebWalletListener<Result = TResponseResults> = (
  params?: TRequestParams
) => Result | Promise<Result>;

export default TAVMWebWalletListener;
