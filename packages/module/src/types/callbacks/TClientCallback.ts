// types
import type { IClientCallbackWithErrorOptions, IClientCallbackWithResultAndSignatureOptions, TResults } from '@/types';

type TClientCallback<Result = TResults> = (
  options: IClientCallbackWithErrorOptions | IClientCallbackWithResultAndSignatureOptions<Result>
) => void | Promise<void>;

export default TClientCallback;
