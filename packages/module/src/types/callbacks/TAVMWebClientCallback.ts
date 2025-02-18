// types
import type { IAVMWebClientCallbackOptions, TResponseResults } from '@app/types';

type TAVMWebClientCallback<Result = TResponseResults> = (
  options: IAVMWebClientCallbackOptions<Result>
) => void | Promise<void>;

export default TAVMWebClientCallback;
