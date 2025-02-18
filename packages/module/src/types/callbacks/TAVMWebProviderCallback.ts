// types
import type { IAVMWebProviderCallbackOptions, TRequestParams, TResponseResults } from '@app/types';

type TAVMWebProviderCallback<Params = TRequestParams, Result = TResponseResults | void> = (
  options: IAVMWebProviderCallbackOptions<Params>
) => Result | Promise<Result>;

export default TAVMWebProviderCallback;
