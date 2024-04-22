// types
import type IAVMWebClientCallbackOptions from './IAVMWebClientCallbackOptions';
import type TResponseResults from './TResponseResults';

type TAVMWebClientCallback<Result = TResponseResults> = (
  options: IAVMWebClientCallbackOptions<Result>
) => void | Promise<void>;

export default TAVMWebClientCallback;
