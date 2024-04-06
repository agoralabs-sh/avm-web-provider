// enums
import { ARC0027MethodEnum } from '@app/enums';

// messages
import { RequestMessage } from '@app/messages';

// types
import type TAVMWebProviderListener from './TAVMWebProviderListener';
import type TRequestParams from './TRequestParams';

interface ISendResponseMessageOptions<RequestParams = TRequestParams> {
  listener: TAVMWebProviderListener;
  method: ARC0027MethodEnum;
  requestMessage: RequestMessage<RequestParams>;
}

export default ISendResponseMessageOptions;
