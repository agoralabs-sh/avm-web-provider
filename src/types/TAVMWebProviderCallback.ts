// types
import type IAVMWebProviderCallbackOptions from './IAVMWebProviderCallbackOptions';
import type TRequestParams from './TRequestParams';
import type TResponseResults from './TResponseResults';

type TAVMWebProviderCallback<
  Params = TRequestParams,
  Result = TResponseResults,
> = (
  options: IAVMWebProviderCallbackOptions<Params>
) => Result | Promise<Result>;

export default TAVMWebProviderCallback;
