// messages
import { RequestMessage } from '@app/messages';

// types
import type { TRequestParams } from '@app/types';

type TProviderCustomEventListener<Params = TRequestParams> = (
  event: CustomEvent<RequestMessage<Params>>
) => Promise<void> | void;

export default TProviderCustomEventListener;
