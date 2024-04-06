// types
import type TRequestParams from './TRequestParams';
import type TResponseResults from './TResponseResults';

type TAVMWebProviderListener<
  Params = TRequestParams,
  Result = TResponseResults,
> = (params?: Params) => Result | Promise<Result>;

export default TAVMWebProviderListener;
