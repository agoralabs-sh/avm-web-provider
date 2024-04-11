// types
import type IAVMWebClientListenerOptions from './IAVMWebClientListenerOptions';
import type TResponseResults from './TResponseResults';

type TAVMWebClientListener<Result = TResponseResults> = (
  options: IAVMWebClientListenerOptions<Result>
) => void | Promise<void>;

export default TAVMWebClientListener;
