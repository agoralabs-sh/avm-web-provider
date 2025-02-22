// types
import type { TResults } from '@/types';
import type IClientCallbackWithResultOptions from './IClientCallbackWithResultOptions';

interface IClientCallbackWithResultAndSignatureOptions<Result = TResults>
  extends IClientCallbackWithResultOptions<Result> {
  challenge: string;
  credential: string;
  signature: string;
}

export default IClientCallbackWithResultAndSignatureOptions;
