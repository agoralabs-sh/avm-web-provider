// types
import type { ICredential, TResults } from '@/types';
import type IResponseMessage from './IResponseMessage';

interface IResponseMessageWithResult<Result = TResults> extends IResponseMessage {
  challenge: string;
  credential: ICredential;
  result: Result;
}

export default IResponseMessageWithResult;
