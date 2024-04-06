// types
import type TRequestParams from './TRequestParams';
import type TResponseResults from './TResponseResults';

type TAVMWebProviderListener<Result = TResponseResults> = (
  params?: TRequestParams
) => Result | Promise<Result>;

export default TAVMWebProviderListener;
