// types
import type IAVMWebProviderListenerOptions from './IAVMWebProviderListenerOptions';
import type TRequestParams from './TRequestParams';
import type TResponseResults from './TResponseResults';

type TAVMWebProviderListener<
  Params = TRequestParams,
  Result = TResponseResults,
> = (
  options: IAVMWebProviderListenerOptions<Params>
) => Result | Promise<Result>;

export default TAVMWebProviderListener;
