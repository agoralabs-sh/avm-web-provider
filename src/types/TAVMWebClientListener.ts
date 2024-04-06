// errors
import { BaseARC0027Error } from '@app/errors';

// types
import type TResponseResults from './TResponseResults';

type TAVMWebClientListener<Result = TResponseResults> = (
  result: Result | null,
  error: BaseARC0027Error | null
) => void;

export default TAVMWebClientListener;
