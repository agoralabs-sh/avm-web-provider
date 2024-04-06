// errors
import { BaseARC0027Error } from '@app/errors';

// types
import type TResponseResults from './TResponseResults';

interface IResponseMessage<Result = TResponseResults> {
  error?: BaseARC0027Error;
  id: string;
  reference: string;
  requestId: string;
  result?: Result;
}

export default IResponseMessage;
