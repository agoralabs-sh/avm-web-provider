// messages
import { RequestMessage } from '@app/messages';

// types
import type TRequestParams from './TRequestParams';

type TProviderCustomEventListener<Params = TRequestParams> = (
  event: CustomEvent<RequestMessage<Params>>
) => Promise<void> | void;

export default TProviderCustomEventListener;
