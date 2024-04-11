// enums
import { ARC0027MethodEnum } from '@app/enums';

// errors
import { BaseARC0027Error } from '@app/errors';

// types
import type TResponseResults from './TResponseResults';

interface IAVMWebClientListenerOptions<Result = TResponseResults> {
  error: BaseARC0027Error | null;
  id: string;
  method: ARC0027MethodEnum;
  result: Result | null;
  requestId: string;
}

export default IAVMWebClientListenerOptions;
