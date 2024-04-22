// enums
import { ARC0027MethodEnum } from '@app/enums';

// messages
import { RequestMessage } from '@app/messages';

// types
import type TAVMWebProviderCallback from './TAVMWebProviderCallback';
import type TRequestParams from './TRequestParams';
import type TResponseResults from './TResponseResults';

interface ISendResponseMessageOptions<
  Params = TRequestParams,
  Result = TResponseResults,
> {
  callback: TAVMWebProviderCallback<Params, Result>;
  method: ARC0027MethodEnum;
  requestMessage: RequestMessage<Params>;
}

export default ISendResponseMessageOptions;
