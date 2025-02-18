// types
import type IBaseResponseMessage from './IBaseResponseMessage';
import type { TResponseResults } from '@app/types';

interface IResponseMessageWithResult<Result = TResponseResults> extends IBaseResponseMessage {
  result: Result;
}

export default IResponseMessageWithResult;
