// types
import type IBaseResponseMessage from './IBaseResponseMessage';
import type TResponseResults from './TResponseResults';

interface IResponseMessageWithResult<Result = TResponseResults>
  extends IBaseResponseMessage {
  result: Result;
}

export default IResponseMessageWithResult;
